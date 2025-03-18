import React, { useState } from "react";
import Input from "../components/Input";
import { useProducts } from "../context/products";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    imageUrl: "",
  });
  const { createProduct } = useProducts();
  let navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.imageUrl) {
      return alert("All fields are required!");
    }
    try {
      const { success, message } = await createProduct(formData);
      console.log("Created");
      if (success) {
        return navigate("/");
      } else {
        alert(message);
      }
      cleanUp();
    } catch (error) {
      alert("Error:", error.message);
    }
  };

  const cleanUp = () => {
    setFormData({
      name: "",
      price: 0,
      imageUrl: "",
    });
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <h3 className="text-3xl font-semibold text-center mt-20">
        Create New Post
      </h3>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-2 p-4 shadow-md rounded-md max-w-xl w-full bg-white dark:bg-zinc-900 mt-4"
      >
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

        <button
          type="submit"
          className="mt-4 w-full cursor-pointer rounded-md py-2 text-lg bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
