import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { NotesContext } from "../context/NotesContext";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const { notes, getAllNotes } = useContext(NotesContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      await getAllNotes();
    };

    fetchNotes();
  }, []);

  const handleLogout = () => {
    logout();
    alert("Logout!");
    navigate("/login");
  };

  return (
    <div className="flex flex-col w-full rounded-md bg-neutral-100 items-start p-6 gap-6">
      <h2 className="text-4xl font-bold">{user.username}</h2>
      <div className="flex flex-row gap-6 items-center">
        <span className="text-lg font-semibold text-neutral-800 ">
          {user.email}
        </span>
        <h3 className="text-lg font-medium text-neutral-800">
          Notes: {notes.length}
        </h3>
      </div>
      <button
        className="rounded-md text-white bg-red-700 hover:bg-red-600 py-2 px-5 cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
