import { Suspense, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NotesContext } from "../context/NotesContext";
import EditDialog from "../components/EditDialog";
import Input from "../components/Input";
import { useToast } from "../context/ToastContext";

const NoteDetails = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();
  const { getNote, deleteNote, updateNote } = useContext(NotesContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Edit Dialog
  const [formData, setFormData] = useState({ title: "", content: "" });
  const { successToast, errorToast } = useToast();

  useEffect(() => {
    const fetchNote = async () => {
      const { success, message, data } = await getNote(noteId);

      if (success) {
        setNote(data);
        setFormData({ title: data.title, content: data.content });
      } else {
        alert(message);
        navigate("/");
      }
    };

    fetchNote();
  }, []);

  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async () => {
    const { success, message } = await deleteNote(noteId);

    if (success) {
      successToast(message);
      navigate(-1);
    } else {
      errorToast(message);
    }
  };

  const handleUpdate = async () => {
    const { success, message } = await updateNote(
      noteId,
      formData.title,
      formData.content
    );

    if (success) {
      setIsDialogOpen(false);
      location.reload();
      successToast(message);
    } else {
      errorToast(message);
    }
  };

  if (!note) return null;

  return (
    <>
      <div className="w-full bg-neutral-100 rounded-md p-3 flex flex-col">
        <div className="flex justify-between border-b border-neutral-400 p-4">
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-yellow-800 mb-3">
              {note.title}
            </h2>
            <span className="text-sm text-neutral-700">
              Created At: {note.createdAt.split("T")[0]}
            </span>
            <span className="text-sm text-neutral-700">
              Updated At: {note.updatedAt.split("T")[0]}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleDelete}
              className="px-5 py-2 text-white bg-red-700 hover:bg-red-800 cursor-pointer rounded-md"
            >
              Delete
            </button>
            <button
              onClick={() => {
                setIsDialogOpen(true);
              }}
              className="px-5 py-2 text-white bg-yellow-700 hover:bg-yellow-800 cursor-pointer rounded-md"
            >
              Update
            </button>
          </div>
        </div>

        <p className="p-3 pt-6 text-lg text-neutral-800">{note.content}</p>
      </div>
      <EditDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Edit Note"
        primaryAction={{
          label: "Update",
          action: handleUpdate,
        }}
        secondaryAction={{
          label: "Cancel",
          action: () => {
            setIsDialogOpen(false);
          },
        }}
      >
        <Input
          name="title"
          type="text"
          placeholder="Note title..."
          value={formData.title}
          onChange={onFormChange}
        />
        <textarea
          name="content"
          placeholder="Note Content..."
          value={formData.content}
          onChange={onFormChange}
          className="p-3 rounded-sm border border-neutral-200 bg-white text-lg w-full focus:border-neutral-400 outline-none h-[200px] resize-none mt-2"
          required
        ></textarea>
      </EditDialog>
    </>
  );
};

export default NoteDetails;
