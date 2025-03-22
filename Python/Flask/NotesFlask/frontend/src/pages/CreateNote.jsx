import React, { useContext, useState } from "react";
import { NotesContext } from "../contexts/NotesContext";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";

const CreateNote = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const { createNote } = useContext(NotesContext);
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { success, message } = await createNote(
      formData.title,
      formData.content
    );
    if (success) {
      navigate("/");
    } else {
      alert(message);
    }
  };

  return (
    <div className="flex w-full flex-col h-full justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl w-full mx-4 rounded-lg shadow-lg p-6 flex flex-col gap-3 bg-stone-900 mt-20"
      >
        <h2 className="mb-6 text-3xl font-bold text-center">Create New Note</h2>
        <Input
          name="title"
          type="text"
          placeholder="Note Title..."
          value={formData.title}
          onChange={onChange}
          required
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={onChange}
          placeholder="Note Content..."
          className="p-2 rounded-md outline-none border border-neutral-700 hover:border-neutral-600 focus:border-neutral-600 h-32 resize-none"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full text-lg mt-6 bg-zinc-800 hover:bg-zinc-700 rounded-md py-2 cursor-pointer"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
