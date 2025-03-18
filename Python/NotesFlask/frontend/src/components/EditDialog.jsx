import { useContext, useEffect, useState } from "react";
import Input from "../components/Input";
import { NotesContext } from "../contexts/NotesContext";

const EditDialog = ({ isOpen, onClose, note, setNote }) => {
  const [formData, setFormData] = useState({
    title: note.title,
    content: note.content,
  });
  const { updateNote } = useContext(NotesContext);

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title || "",
        content: note.content || "",
      });
    }
  }, [note]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message, data } = await updateNote(
      note.id,
      formData.title,
      formData.content
    );
    if (success) {
      setNote({
        ...note,
        title: formData.title,
        content: formData.content,
      });
    } else {
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-black/55">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl w-full mx-4 p-6 rounded-lg bg-neutral-900 flex flex-col gap-4"
      >
        <h3 className="text-3xl font-semibold text-center mb-4">Edit Note</h3>
        <Input
          name="title"
          type="text"
          placeholder="Title..."
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
        <div className="mt-4 flex gap-3">
          <button
            type="submit"
            className="flex-1 text-lg bg-zinc-800 hover:bg-zinc-700 rounded-md py-2 cursor-pointer"
          >
            Edit Note
          </button>
          <button
            onClick={onClose}
            className="flex-1 text-lg bg-zinc-800 hover:bg-zinc-700 rounded-md py-2 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDialog;
