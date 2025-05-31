import mongoose from "mongoose";
import { ItemSchema } from "./schemas/itemSchema.js";

const checkoutSessionSchema = new mongoose.Schema({
  items: [ItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  }
});

export default mongoose.model("CheckoutSession", checkoutSessionSchema);
