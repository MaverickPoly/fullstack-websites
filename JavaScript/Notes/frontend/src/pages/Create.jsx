import React, { useContext, useState } from "react";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { NotesContext } from "../context/NotesContext";
import { useToast } from "../context/ToastContext";

const Create = () => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const navigate = useNavigate();
  const { createNote } = useContext(NotesContext);
  const { successToast, errorToast } = useToast();

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
      successToast(message);
    } else {
      errorToast(message);
      alert(message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <form
        onSubmit={handleSubmit}
        className="p-2 rounded-md mt-24 bg-neutral-100 flex flex-col gap-3 max-w-xl w-full mx-4 py-6"
      >
        <h2 className="text-3xl text-center font-bold mb-4">New Note</h2>
        <Input
          name="title"
          type="text"
          placeholder="Note Title..."
          value={formData.title}
          onChange={onChange}
        />
        <textarea
          name="content"
          placeholder="Note Content..."
          value={formData.content}
          onChange={onChange}
          className="p-3 rounded-sm border border-neutral-200 bg-white text-lg w-full focus:border-neutral-400 outline-none h-[150px] resize-none"
          required
        ></textarea>

        <button
          type="submit"
          className="mt-4 rounded-md bg-yellow-700 hover:bg-yellow-600 text-white w-full cursor-pointer p-3 text-lg"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default Create;
