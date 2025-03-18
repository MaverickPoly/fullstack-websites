import { NotebookText } from "lucide-react";
import { Link } from "react-router-dom";

const NoteCard = ({ note }) => {
  return (
    <Link
      to={`/note/${note.id}`}
      className="w-full bg-zinc-800 p-4 rounded-lg flex flex-col items-center hover:bg-zinc-700 duration-200"
    >
      <NotebookText size={30} className="mb-3 mt-2" />
      <h2 className="text-2xl font-bold mb-1">{note.title}</h2>
      <p className="text-md text-neutral-200">{note.content}</p>
      <span className="text-sm text-neutral-400">{note.created_at}</span>
    </Link>
  );
};

export default NoteCard;
