import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../contexts/NoteContext";
import Input from "../components/Input";

const CreatePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();
  const { createNote } = useNotes();

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { success, message, data } = await createNote({ ...formData });

    // TODO: Toast
    if (success) {
      alert(message);
      navigate("/");
    } else {
      alert(message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col border border-neutral-700 p-4 shadow-md shadow-neutral-800 gap-4 mt-24 max-w-lg w-full"
      >
        <h2 className="text-3xl font-semibold text-center mb-3">Create Note</h2>

        <Input
          name="title"
          type="text"
          value={formData.title}
          placeholder="Note title..."
          onChange={onChange}
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          className="bg-neutral-800 border border-neutral-700 p-2 w-full outline-none text-neutral-300 shadow-sm focus:shadow-neutral-700 h-[120px] resize-none"
          placeholder="Note description..."
        ></textarea>

        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 text-lg text-center cursor-pointer mt-4 mb-3"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
