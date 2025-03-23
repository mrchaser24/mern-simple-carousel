import mongoose from "mongoose";

// This is the requirements of the product model
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// this is the product model where we set the data structure
const Product = mongoose.model("Product", productSchema);

export default Product;
