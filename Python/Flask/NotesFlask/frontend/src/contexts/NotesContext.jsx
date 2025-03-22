import { createContext, useContext, useState } from "react";
import axiosInstance from "../util/axiosInstance";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { API_URL } from "../constants/backend";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const { token } = useContext(AuthContext);

  const getNotes = async () => {
    try {
      const response = await axiosInstance.get(`/`);
      // const response = await axios.get(`${API_URL}/`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     Accept: "*/*",
      //   },
      // });
      // const res = await fetch(`${API_URL}/`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      // const data = await res.json();
      // const response = { data: data };
      setNotes(response.data.notes);
      return { success: true, message: "Notes fetched successfully!" };
    } catch (error) {
      console.error(
        `Error fetching Notes: ${error.response?.data.message || error}`
      );
      return {
        success: false,
        message: `Error fetching Notes: ${
          error.response?.data.message || error
        }`,
      };
    }
  };

  const createNote = async (title, content) => {
    try {
      const response = await axiosInstance.post(
        "/",
        { title, content },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setNotes([...notes, response.data.note]);
      return { success: true, message: "Note created successfully!" };
    } catch (error) {
      console.error(`Error Creating Note: ${error.response?.data || error}`);
      return {
        success: false,
        message: `Error Creating Note: ${error.response?.data || error}`,
      };
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axiosInstance.delete(`/${id}`);
      setNotes(notes.filter((note) => note.id !== id));
      return { success: true, message: "Note deleted successfully!" };
    } catch (error) {
      console.error(`Error Deleting Note: ${error.response?.message || error}`);
      return {
        success: false,
        message: `Error Deleting Note: ${error.response?.message || error}`,
      };
    }
  };

  const getNote = async (id) => {
    try {
      const response = await axiosInstance.get(`/${id}`);
      return {
        success: true,
        message: "Note fetched successfully!",
        data: response.data.data,
      };
    } catch (error) {
      console.error(`Error Fetching Note: ${error.response?.message || error}`);
      return {
        success: false,
        message: `Error Fetching Note: ${error.response?.message || error}`,
        data: null,
      };
    }
  };

  const updateNote = async (id, title, content) => {
    try {
      if (!title || !content) {
        return { success: false, message: "All fields are required!" };
      }
      const response = await axiosInstance.put(`/${id}`, { title, content });
      const updatedNote = response.data.data;
      setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
      return {
        success: true,
        message: "Note updated successfully!",
        data: updatedNote,
      };
    } catch (error) {
      console.error(`Error Updating Note: ${error.response?.data || error}`);
      return {
        success: false,
        message: `Error Updating Note: ${error.response?.data || error}`,
      };
    }
  };

  return (
    <NotesContext.Provider
      value={{ notes, getNotes, createNote, deleteNote, getNote, updateNote }}
    >
      {children}
    </NotesContext.Provider>
  );
};
