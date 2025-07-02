import { useArticles } from "../context/article.context.tsx";
import Form from "../components/Form.tsx";
import { type ChangeEvent, type FormEvent, useState } from "react";
import Input from "../components/Input.tsx";
import { useNavigate } from "react-router";

export default function CreatePage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });
  const { createArticle } = useArticles();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.category) {
      return alert("All fields are required!");
    }

    const { success, message } = await createArticle(formData);

    if (success) {
      console.log(message);
      navigate("/");
    } else {
      console.error(message);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Form handleSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold mb-6">Create Article</h2>
        <Input
          type="text"
          name="title"
          className=""
          value={formData.title}
          placeholder="Title..."
          onChange={handleChange}
        />
        <textarea
          name="content"
          className="text-lg rounded-lg p-2 outline-none border border-stone-200 focus:border-stone-400 h-40"
          value={formData.content}
          onChange={handleChange}
          placeholder="Content..."
        ></textarea>
        <Input
          type="text"
          name="category"
          className=""
          value={formData.category}
          placeholder="Category..."
          onChange={handleChange}
        />
        <button
          className="bg-violet-500 hover:bg-violet-600 text-white rounded-lg p-2 text-lg cursor-pointer"
          type="submit"
        >
          Create
        </button>
      </Form>
    </div>
  );
}
