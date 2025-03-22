import { useEffect } from "react";
import { useNotes } from "../contexts/NoteContext"
import NoteCard from "../components/NoteCard";
import { MdOutlineEditNote } from "react-icons/md";

const HomePage = () => {
  const { notes, getAllNotes } = useNotes();

  useEffect(() => {
    const fetch = async () => {
      const {success, message} = await getAllNotes();

      if (success) {

      }
      else {
        // TODO: Toast
        alert(message);
      }
    }

    fetch();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-3">
      {/* Info Banner */}
      <div className="w-full flex items-center pb-6 mb-10 border-b border-neutral-700">
        <h2 className="text-4xl font-semibold items-center bg-gradient-to-r text-transparent bg-clip-text from-emerald-700 to-emerald-500">Notes List</h2>
        <MdOutlineEditNote size={45} className="mt-2 ml-10"/>
      </div>
      {/* Notes */}
      <div className="grid gap-4 grid-cols-1 md:grid-col-2 xl:grid-cols-3">
        {notes.map((note) => (
          <NoteCard note={note} key={note.id}  />
        ))}
      </div>
    </div>
  )
}

export default HomePage