import express from "express";
import { allProducts, createProduct, deleteProduct, getProduct, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();


// All Products
router.get("/", allProducts)

// Create Product
router.post("/", createProduct)

// Get Product
router.get("/:id", getProduct)

// Delete Product
router.delete("/:id", deleteProduct)

// Update Product
router.put("/:id", updateProduct)

export default router
