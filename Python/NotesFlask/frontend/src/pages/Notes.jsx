import React, { useContext, useEffect, useState } from "react";
import { NotesContext } from "../contexts/NotesContext";
import NoteCard from "../components/NoteCard";
import { Link } from "react-router-dom";

const Notes = () => {
  const { notes, getNotes } = useContext(NotesContext);

  useEffect(() => {
    const fetch = async () => {
      const { success, message } = await getNotes();
    };
    fetch();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-4xl font-bold">Your Notes</h2>
      {notes.length > 0 ? (
        <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {notes.map((note, id) => (
            <NoteCard note={note} key={note.id} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full mt-10 gap-3 text-neutral-300">
          <p className="text-lg">You do not have any notes!</p>
          <Link className="font-bold text-xl hover:underline" to="/create">
            Create one.
          </Link>
        </div>
      )}
    </div>
  );
};

export default Notes;
