import mongoose from "mongoose";

export const ItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    variantAttributes: {
      type: Map,
      of: String,
      default: {},
    },
    name: String,
    price: Number,
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    image: String,
  },
  { _id: false }
);
