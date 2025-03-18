import mongoose from "mongoose";
import { Product } from "../models/product.model.js";


export const allProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: `Internal Server error: ${error.message}` });
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.imageUrl) {
        return res.status(400).json({ success: false, message: "All fields are required!s" })
    }

    try {
        const newProduct = new Product(product)
        await newProduct.save();
        res.status(201).json({ success: true, message: "Product created successfully!", data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: `Internal Server error: ${error.message}` });
    }
}

export const getProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: true, message: `Product with id ${id} not found!` });
    }

    try {
        const product = await Product.findById(id);
        if (product) {
            return res.json({ success: true, data: product });
        }
        res.status(404).json({ success: false, message: `There is not product with id ${id}` })
    }
    catch (error) {
        res.status(500).json({ success: false, message: `Internal Server error: ${error.message}` });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: true, message: `Product with id ${id} not found!` });
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            res.status(400).json({ success: false, message: `Product with id ${id} was not found.` });
        } else {
            res.json({ success: true, message: `Product with id ${id} deleted successfully.`, data: deletedProduct });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: `Internal Server error: ${error.message}` });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: true, message: `Product with id ${id} not found!` });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        if (!updatedProduct) {
            res.status(400).json({ success: false, message: `Product with id ${id} was not found.` });
        } else {
            res.json({ success: true, message: `Product with id ${id} updated successfully!`, data: updatedProduct });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: `Internal Server error: ${error.message}` });
    }
}
