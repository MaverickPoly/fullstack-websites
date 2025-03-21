import { useContext, useEffect } from "react";
import { NotesContext } from "../context/NotesContext";
import NoteCard from "../components/NoteCard";

const Notes = () => {
  const { notes, getAllNotes } = useContext(NotesContext);

  useEffect(() => {
    const fetchNotes = async () => {
      await getAllNotes();
    };

    fetchNotes();
  }, []);

  return (
    <div className="mx-4">
      <h3 className="flex flex-row gap-4 text-3xl font-semibold items-center text-yellow-700">
        Your Notes
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 25"
          fill="orange"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.75 2.5C5.50736 2.5 4.5 3.50736 4.5 4.75V6.75H3.25C2.83579 6.75 2.5 7.08579 2.5 7.5C2.5 7.91421 2.83579 8.25 3.25 8.25H4.5V11.75H3.25C2.83579 11.75 2.5 12.0858 2.5 12.5C2.5 12.9142 2.83579 13.25 3.25 13.25H4.5V16.75H3.25C2.83579 16.75 2.5 17.0858 2.5 17.5C2.5 17.9142 2.83579 18.25 3.25 18.25H4.5V20.25C4.5 21.4926 5.50736 22.5 6.75 22.5H17.25C18.4926 22.5 19.5 21.4926 19.5 20.25V4.75C19.5 3.50736 18.4926 2.5 17.25 2.5H6.75ZM7.5 17.5C7.5 17.9142 7.16421 18.25 6.75 18.25C6.33579 18.25 6 17.9142 6 17.5C6 17.0858 6.33579 16.75 6.75 16.75C7.16421 16.75 7.5 17.0858 7.5 17.5ZM7.5 7.5C7.5 7.91421 7.16421 8.25 6.75 8.25C6.33579 8.25 6 7.91421 6 7.5C6 7.08579 6.33579 6.75 6.75 6.75C7.16421 6.75 7.5 7.08579 7.5 7.5ZM7.5 12.5C7.5 12.9142 7.16421 13.25 6.75 13.25C6.33579 13.25 6 12.9142 6 12.5C6 12.0858 6.33579 11.75 6.75 11.75C7.16421 11.75 7.5 12.0858 7.5 12.5Z"
            fill="#323544"
          />
        </svg>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
        {notes.map((note) => (
          <NoteCard note={note} key={note._id} />
        ))}
      </div>
    </div>
  );
};

export default Notes;
