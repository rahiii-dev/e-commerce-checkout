import asyncWrapper from "../utils/asyncWrapper.js";
import Product from "../model/product.model.js";
import Chekout from "../model/checkout.modal.js";

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
    const product = await Product.findOne({id: item.productId});

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
      name,
      price,
      quantity: item.quantity,
      variantAttributes: item.attributes || {},
      image,
      subtotal,
    });
  }

  
  const session = await Chekout.create({
    items: validatedItems,
    totalAmount,
  });

  res.status(201).json({ sessionId: session._id });
});

// @route   GET /api/chechkout/session/:id
// @desc    get checkout session
export const getCheckoutSession = asyncWrapper(async (req, res) => {
  const session = await Chekout.findById(req.params.id);

  if (!session) {
    res.status(404);
    throw new Error("Invalid or Expired Session");
  }

  res.json(session);
});
