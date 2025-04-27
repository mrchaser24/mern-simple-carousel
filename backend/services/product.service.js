import Product from '../models/product.model.js'

const createProduct = async (product) =>{
	const newProduct = new Product(product);
	return await newProduct.save();
}

const getProducts = async(filter = null, limit = 12) => {
	let skip = (filter.page - 1) * limit
	let query = Product.find({});
	
	// if (filter.name) {
	// 	query = query.sort({filter});
	// }

	return await query.skip(skip).limit(limit)
}
const getProductTotal = async() => {
	return Product.find({});
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
	deleteProduct,
	getProductTotal
}