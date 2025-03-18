import React, { useEffect, useState } from "react";
import Input from "./Input";
import { useProducts } from "../context/products";

const EditDialog = ({ isOpen, closeDialog, product }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
  });
  const { updateProduct } = useProducts();

  // Press ESC to Close
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeDialog();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeDialog]);

  if (!isOpen) return null;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.imageUrl) {
      return alert("All fields are required!");
    }
    try {
      const { success, message } = await updateProduct(product._id, formData);

      if (success) {
        // Success
      } else {
        console.error(`Error: ${message}`);
        alert(`Error: ${message}`);
      }
    } catch (error) {
      console.error(`Error: ${error}`);
      alert(`Error: ${error}`);
    }

    closeDialog();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/55 flex items-center justify-center">
      <form
        onSubmit={handleUpdate}
        className="flex bg-white flex-col dark:bg-neutral-900 p-5 max-w-md w-full rounded-md gap-3"
      >
        <h2 className="text-xl font-semibold mb-3">Update Product</h2>
        {/* Inputs */}
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Product Name..."
        />
        <Input
          type="number"
          name="price"
          value={formData.price}
          onChange={onChange}
          placeholder="Product Price..."
        />
        <Input
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={onChange}
          placeholder="Product Image URL..."
        />

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-6 items-center">
          <button
            onClick={closeDialog}
            className="px-4 py-2 cursor-pointer bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 cursor-pointer bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-md"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDialog;
