import { createContext, useState } from "react";
import axiosInstace from "../utils/axiosInstance";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  // Fetch All Notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstace.get("/notes");
      console.log(response.data);
      setNotes(response.data);
      return { success: true, message: "Fetched Notes Successfully!" };
    } catch (error) {
      return {
        success: false,
        message: `Error fetching Notes: ${error.response.data.message}`,
      };
    }
  };

  // Create New Note
  const createNote = async (title, content) => {
    try {
      const response = await axiosInstace.post("/notes", { title, content });
      console.log(response.data);
      setNotes([...notes, response.data.data]);
      return { success: true, message: "Created Note Successfully!" };
    } catch (error) {
      return {
        success: false,
        message: `Error Creating Note: ${error.response.data.message}`,
      };
    }
  };

  // Get Specific Note BY ID
  const getNote = async (id) => {
    try {
      const response = await axiosInstace.get(`/notes/${id}`);

      return {
        success: true,
        message: "Fetched Note Successfully!",
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error fetching Note: ${error.response.data.message}`,
      };
    }
  };

  // Delete Note with ID
  const deleteNote = async (id) => {
    try {
      const response = await axiosInstace.delete(`/notes/${id}`);
      console.log(response.data);

      setNotes(notes.filter((note) => note._id !== id));
      return { success: true, message: "Deleted Note Successfully!" };
    } catch (error) {
      return {
        success: false,
        message: `Error Deleting Note: ${error.response.data.message}`,
      };
    }
  };

  // Update Note with id
  const updateNote = async (id, title, content) => {
    try {
      const response = await axiosInstace.put(`/notes/${id}`, {
        title,
        content,
      });
      console.log(response.data);

      setNotes(
        notes.map((note) =>
          note.id === id ? { ...note, title: title, content: content } : note
        )
      );
      return { success: true, message: "Updated Note Successfully!" };
    } catch (error) {
      return {
        success: false,
        message: `Error Updating Note: ${error.response.data.message}`,
      };
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        getAllNotes,
        createNote,
        getNote,
        deleteNote,
        updateNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
