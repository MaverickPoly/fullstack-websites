import React from "react";
import { Link } from "react-router-dom";

const NoteCard = ({ note }) => {
  return (
    <Link
      to={`/note/${note._id}`}
      className="rounded-md bg-neutral-100 p-3 shadow-sm hover:shadow-lg duration-150"
    >
      <h2 className="text-2xl font-semibold">{note.title}</h2>
      <span className="text-neutral-800 text-base">
        {note.content.split("").slice(0, 50).join("")}
        {note.content.split("").length > 50 ? "..." : ""}
      </span>
    </Link>
  );
};

export default NoteCard;
