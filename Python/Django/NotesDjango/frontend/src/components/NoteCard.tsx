import { Link } from "react-router-dom";
import { Note } from "../types"
import { LuNotebookPen } from "react-icons/lu";

const NoteCard = ({note}: {note: Note}) => {

    const getCroppedDescription = () => {
        const targetNumber = 60;
        return note.description.length > targetNumber ? note.description.split("").slice(0, targetNumber).join("") + "...": note.description;
    }

  return (
    <Link to={`/note/${note.id}`} className="w-full p-4 rounded-sm border border-neutral-700 flex flex-col items-start hover:border-neutral-500 duration-200">
        <div className="flex">
            <LuNotebookPen size={40} className="mr-4 text-emerald-600" />
            <h3 className="text-2xl font-semibold">{note.title}</h3>
        </div>
        <p className="text-sm text-neutral-300 mt-5">{getCroppedDescription()}</p>
    </Link>
  )
}

export default NoteCard;