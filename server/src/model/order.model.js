import mongoose from "mongoose";
import { ItemSchema } from "./schemas/itemSchema.js";
import { addressSchema } from "./schemas/addressSchema.js";

export const PAYMENT_METHODS = Object.freeze({
  card: "Card",
  cod: "Cash On Delivery",
});

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    items: [ItemSchema],
    shippingAddress: addressSchema,
    paymentMethod: {
      type: String,
      enum: Object.values(PAYMENT_METHODS),
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
      },
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
      },
    },
  }
);

orderSchema.virtual("id").get(function () {
  return this._id.toString();
});

export default mongoose.model("Order", orderSchema);
