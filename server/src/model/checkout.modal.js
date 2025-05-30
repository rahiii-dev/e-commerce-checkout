import mongoose from "mongoose";
import { ItemSchema } from "./schemas/itemSchema.js";

const checkoutSessionSchema = new mongoose.Schema({
  items: [ItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
  },
});

checkoutSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("CheckoutSession", checkoutSessionSchema);
