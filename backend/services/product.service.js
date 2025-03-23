import Product from '../models/product.model.js'

const createProduct = async (product) =>{
	const newProduct = new Product(product);
	return await newProduct.save();
}

const getProducts = async() => {
	return await Product.find({});
}

const updateProduct = async(id, product) => {
	return await Product.findByIdAndUpdate(id, product, { new: true });
}

const deleteProduct = async(id) => {
	return await Product.findByIdAndDelete(id);
}

export default {
	createProduct, 
	getProducts, 
	updateProduct, 
	deleteProduct
}