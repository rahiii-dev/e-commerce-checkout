import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],

    variantAttributes: [
      {
        name: {
          type: String,
          required: true,
        },
        values: [
          {
            type: String,
            required: true,
          },
        ],
      },
    ],

    variantCombinations: [
      {
        attributes: {
          type: Map,
          of: String,
          required: true,
        },
        product: {
          id: String,
          name: String,
          price: Number,
          stock: Number,
          images: [String],
          description: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
