import orderModel from "../model/order.model.js";
import asyncWrapper from "../utils/asyncWrapper.js";

// @route   GET /api/order/:id
// @desc    get checkout session
export const getOrderDetails = asyncWrapper(async (req, res) => {
  const order = await orderModel.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Invalid order");
  }

  res.json(order);
});