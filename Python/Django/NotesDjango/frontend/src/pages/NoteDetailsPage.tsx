import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Note } from "../types";
import { useNotes } from "../contexts/NoteContext";
import { CgNotes } from "react-icons/cg";
import EditDialog from "../components/EditDialog";

const NoteDetailsPage = () => {
  const { id } = useParams();
  const [note, setNote] = useState<Note | undefined>(undefined);
  const { getNote, deleteNote } = useNotes();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      let intId = parseInt(id || "");

      if (isNaN(intId)) {
        // TODO: Toast
        alert("Invalid Note ID!");
        return <Navigate to="/" />;
      }

      const { success, message, data } = await getNote({ id: intId });

      // TODO: Toasts
      if (success) {
        setNote(data);
      } else {
        alert(message);
        navigate(-1);
      }
    };

    fetch();
  }, []);

  const handleEdit = () => {
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!note?.id)  return;
    const {success, message, data} = await deleteNote({id: note?.id});

    // TODO: Toast
    if (success) {
      alert(message);
      navigate(-1);
    } else {
      alert(message);
    }
  };

  if (!note) return null;

  return (
    <>
      <div className="max-w-2xl mx-auto mt-10 bg-neutral-800 p-6 rounded-sm shadow-md shadow-neutral-700">
        {/* Info */}
        <div className="pb-6 border-b border-neutral-600 mb-6 flex justify-between">
          <div className="flex flex-col items-start">
            {/* Upper */}
            <div className="flex mb-6">
              <CgNotes size={50} className="text-emerald-700 mr-6" />
              <h2 className="text-3xl font-semibold">{note.title}</h2>
            </div>
            {/* Lower */}
            <h4 className="text-neutral-300 text-sm">
              <span className="text-emerald-600 text-base">Created:</span>{" "}
              {note.created_at.split("T")[0]},{" "}
              {note.created_at.split("T")[1].split(".")[0]}
            </h4>
            <h4 className="text-neutral-300 text-sm">
              <span className="text-emerald-600 text-base">Updated:</span>{" "}
              {note.updated_at.split("T")[0]},{" "}
              {note.updated_at.split("T")[1].split(".")[0]}
            </h4>
          </div>
          {/* Actions */}
          <div className="flex flex-col gap-3 items-end">
            <button
              className="rounded-sm bg-transparent border border-neutral-700 px-5 py-1 hover:bg-neutral-700 duration-200 cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="rounded-sm bg-red-800 px-5 py-1 hover:bg-red-900 cursor-pointer duration-200"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-neutral-200">{note.description}</p>
      </div>
      <EditDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} note={note} setNote={setNote}/>
    </>
  );
};

export default NoteDetailsPage;
