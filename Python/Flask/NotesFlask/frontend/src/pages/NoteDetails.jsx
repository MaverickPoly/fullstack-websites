import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NotesContext } from "../contexts/NotesContext";
import { Trash, Edit } from "lucide-react";
import EditDialog from "../components/EditDialog";

const NoteDetails = () => {
  let { noteId } = useParams();
  const { getNote, deleteNote } = useContext(NotesContext);
  const [note, setNote] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!/^\d+$/.test(noteId)) {
      // Redirect if the ID is not numeric
      alert("Invalid ID: Only numeric values are allowed!");
      navigate("/");
    } else {
      noteId = parseInt(noteId);
    }

    const fetch = async () => {
      const { success, message, data } = await getNote(noteId);

      if (!success) {
        navigate("/");
      } else {
        setNote(data);
      }
    };

    fetch();
  }, []);

  const handleDelete = async () => {
    const { success, message } = await deleteNote(note.id);

    if (!success) {
    } else {
      alert("Note deleted successfully!");
      navigate("/");
    }
  };

  const handleEdit = async () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between px-8 items-center border-b border-neutral-700 pb-8">
        <div className="flex flex-col">
          <h2 className="text-4xl font-bold mb-4 text-neutral-200">
            {note.title}
          </h2>
          <span className="text-neutral-300 text-md">{note.created_at}</span>
        </div>
        <div className="flex gap-2">
          <button
            className="p-3 rounded-md bg-red-800 hover:bg-red-700 cursor-pointer"
            onClick={handleDelete}
          >
            <Trash />
          </button>
          <button
            className="p-3 rounded-md bg-amber-800 hover:bg-amber-700 cursor-pointer"
            onClick={handleEdit}
          >
            <Edit />
          </button>
        </div>
      </div>
      <p className="mt-10 text-lg">{note.content}</p>
      <EditDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        note={note}
        setNote={setNote}
      />
    </div>
  );
};

export default NoteDetails;
