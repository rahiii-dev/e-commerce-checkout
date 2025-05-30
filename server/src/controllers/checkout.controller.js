import asyncWrapper from "../utils/asyncWrapper.js";
import Product from "../model/product.model.js";
import CheckoutSession from "../model/checkout.modal.js";
import Order, { PAYMENT_METHODS } from "../model/order.model.js";
import { generateOrderId } from "../utils/helper.js";
import mongoose from "mongoose";

// @route   POST /api/chechkout/session
// @desc    create checkout session
export const createCheckoutSession = asyncWrapper(async (req, res) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error("Cart is empty");
  }

  let totalAmount = 0;
  const validatedItems = [];

  for (const item of items) {
    const product = await Product.findOne({ id: item.productId });

    if (!product) {
      res.status(404);
      throw new Error(`Product not found`);
    }

    let name = product.name;
    let price = product.price;
    let image = product.images?.[0] || "";
    let stock = product.stock;

    // Variant logic
    if (item.attributes && Object.keys(item.attributes).length > 0) {
      const variant = product.variantCombinations.find((combo) => {
        return combo.product.id === item.id;
      });

      if (!variant) {
        res.status(400);
        throw new Error(`Invalid variant selected for ${product.name}`);
      }

      // Override with variant product
      name = variant.product.name || name;
      price = variant.product.price ?? price;
      image = variant.product.images?.[0] || image;
      stock = variant.product.stock ?? stock;
    }

    if (item.quantity > stock) {
      res.status(400);
      throw new Error(`Insufficient stock for ${name}`);
    }

    const subtotal = price * item.quantity;
    totalAmount += subtotal;

    validatedItems.push({
      product: product._id,
      id: item.id,
      name,
      price,
      quantity: item.quantity,
      variantAttributes: item.attributes || {},
      image,
      subtotal,
    });
  }

  const session = await CheckoutSession.create({
    items: validatedItems,
    totalAmount,
  });

  res.status(201).json({ sessionId: session._id });
});

// @route   GET /api/chechkout/session/:id
// @desc    get checkout session
export const getCheckoutSession = asyncWrapper(async (req, res) => {
  const session = await CheckoutSession.findById(req.params.id);

  if (!session) {
    res.status(404);
    throw new Error("Invalid or Expired Session");
  }

  res.json(session);
});

// @route   POST /api/chechkout/confirm-session
// @desc    confirm checkout session
export const confirmCheckout = asyncWrapper(async (req, res) => {
  const { address, paymentDetails, sessionId, email } = req.body;

  // Load and validate session
  const session = await CheckoutSession.findById(sessionId);
  if (!session) {
    res.status(404);
    throw new Error("Invalid or Expired Session");
  }

  // Start transaction
  const mongoSession = await mongoose.startSession();
  mongoSession.startTransaction();

  try {
    // Validate stock & reserve
    for (const item of session.items) {
      let result;

      // variant product
      if (
        item.variantAttributes &&
        Object.keys(item.variantAttributes).length
      ) {
        result = await Product.updateOne(
          {
            _id: item.product,
            "variantCombinations.product.id": item.id,
            "variantCombinations.product.stock": { $gte: item.quantity },
          },
          {
            // decrement that combo's stock
            $inc: { "variantCombinations.$.product.stock": -item.quantity },
          },
          {
            session: mongoSession,
          }
        );
      } else {
        //regular product
        result = await Product.updateOne(
          {
            _id: item.product,
            stock: { $gte: item.quantity },
          },
          {
            $inc: { stock: -item.quantity },
          },
          { session: mongoSession }
        );
      }

      if (result.modifiedCount === 0) {
        res.status(400);
        throw new Error(`Insufficient stock for product ${item.name}`);
      }
    }

    // handle payment
    const { cardNumber } = paymentDetails;

    if (cardNumber.startsWith("2222")) {
      res.status(402);
      throw new Error("Payment was declined");
    } else if (!cardNumber.startsWith("1111")) {
      res.status(502);
      throw new Error("Payment gateway error");
    }

    // Create Order
    const orderId = generateOrderId();
    const order = await Order.create(
      [
        {
          orderId,
          email,
          items: session.items,
          shippingAddress: address,
          paymentMethod: PAYMENT_METHODS.card,
          totalAmount: session.totalAmount,
        },
      ],
      { session: mongoSession }
    );

    // Delete checkout session
    await CheckoutSession.deleteOne(
      { _id: sessionId },
      { session: mongoSession }
    );

    // Commit
    await mongoSession.commitTransaction();
    await mongoSession.endSession();

    // Send email in background (not blocking)

    console.log(order);
    res.status(201).json(order[0]);
  } catch (err) {
    await mongoSession.abortTransaction();
    await mongoSession.endSession();
    throw err;
  }
});
