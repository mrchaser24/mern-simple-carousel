import mongoose from "mongoose";
import ProductService from "../services/product.service.js"

export const createProducts = async (req, res) => {
  const product = req.body; // this is the product that we are going to save in the database

	if (!product.name || !product.price || !product.image) {
		return res.status(400).json({message: "All fields are required"});
	}

	try {
		const data = await ProductService.createProduct(product);
		res.status(201).json({
			success: true,
			data:data
		})
	} catch (error) {
		console.error("Error in create product:", error.message);
		res.status(500).json({message: "Server error"});
	}
}

export const getProducts = async (req, res) => {
  const filter = req.query;
  
  try {
    const data = await ProductService.getProducts(filter);
		
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("Error in fetching products:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid prodict id",
    });
  }

  try {
    const data = await ProductService.updateProduct(id, product);
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error in updating product:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid prodict id",
    });
  }

  try {
    await ProductService.deleteProduct(id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleting products:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
