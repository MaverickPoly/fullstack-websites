import { create } from "zustand";

const API_URL = "api/products";

export const useProducts = create((set) => ({
  products: [],
  getProducts: async () => {
    try {
      console.log("API URL:", API_URL);
      const res = await fetch(`${API_URL}`);
      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message };
      } else {
        set({ products: data.data });
        return { success: true, message: "Fetched products successfully!" };
      }
    } catch (error) {
      console.error(`Error fetching Products: ${error}`);
      return { success: false, message: `Error fetching Products: ${error}` };
    }
  },
  createProduct: async (product) => {
    if (!product.name || !product.price || !product.imageUrl) {
      return { success: false, message: "All fields are required!" };
    }
    const res = await fetch(`${API_URL}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    try {
      const data = await res.json();
      if (!data.success) {
        return {
          success: false,
          message: `Not success: ${data.message}`,
        };
      } else {
        set((state) => ({ products: [...state.products, data.data] }));
        return {
          success: true,
          message: `Product created successfully: ${data.data}`,
        };
      }
    } catch (error) {
      console.error(`Error creating product: ${error.message}`);
      return {
        success: false,
        message: `Error creating product: ${error.message}`,
      };
    }
  },
  deleteProduct: async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message };
      } else {
        set((state) => ({
          products: state.products.filter((product) => product._id !== id),
        }));
        console.log(`Returned data from backend:`);
        console.log(data);
        return { success: true, message: data.message };
      }
    } catch (error) {
      console.error(`Error deleting product: ${error.message}`);
      return {
        success: false,
        message: `Error deleting product: ${error.message}`,
      };
    }
  },
  updateProduct: async (id, newProduct) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message };
      } else {
        set((state) => ({
          products: state.products.map((product) =>
            product._id === id ? data.data : product
          ),
        }));
        return { success: true, message: data.message };
      }
    } catch (error) {
      console.error(`Error Updating Product: ${error.message}`);
      return {
        success: false,
        message: `Error Updating Product: ${error.message}`,
      };
    }
  },
}));
