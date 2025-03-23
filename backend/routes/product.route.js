import express from "express";

import { createProducts, getProducts, updateProduct, deleteProduct} from "../controller/product.controller.js";

const router = express.Router();

// this is the specific route for the product
router.post("/", createProducts);
router.get("/", getProducts)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

export default router;