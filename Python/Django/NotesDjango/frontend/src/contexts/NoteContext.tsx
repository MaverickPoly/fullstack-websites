import { createContext, ReactNode, useContext, useState } from "react";
import {
  CreateNotePayload,
  Note,
  NotesContextPayload,
  UpdateNotePayload,
} from "../types";
import axiosInstance from "../utils/axiosInstance";
import { API_URL } from "../constants";

export const NotesContext = createContext<NotesContextPayload | undefined>(
  undefined
);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  // Fetch All Notes
  const getAllNotes = async () => {
    try {
        const response = await axiosInstance.get(`${API_URL}/notes/`);
        setNotes(response.data);
        console.log(response.data);
        return {success: true, message: "Fetched notes successfully!"};
    } catch (error) {
        console.error(`Error fetching notes: ${error}`);
        return {success: false, message: "Failed to fetch Notes!"};
    }
  };

  // Create New Note
  const createNote = async (props: CreateNotePayload) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/notes/`, {
            ...props
        });
        setNotes((prev) => [...prev, response.data]);
        console.log(response.data);
        return {success: true, message: "Created Note successfully!"};
    } catch (error) {
        console.error(`Error creating note: ${error}`);
        return {success: false, message: "Failed to create Note!"};
    }
  };

  // Get Note with specific ID
  const getNote = async ({ id }: { id: number }) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/notes/${id}/`);
        console.log(response.data);
        return {success: true, message: "Fetched a note successfully!", data: response.data};
    } catch (error) {
        console.error(`Error fetching a note: ${error}`);
        return {success: false, message: "Failed to fetch a Note!"};
    }
  };

  // Delete Note with specific ID
  const deleteNote = async ({ id }: { id: number }) => {
    try {
        const response = await axiosInstance.delete(`${API_URL}/notes/${id}/`);
        setNotes((prev) => prev.filter(note => note.id !== id));
        console.log(response.data);
        return {success: true, message: "Deleted a Note successfully!", data: response.data};
    } catch (error) {
        console.error(`Error deleting a note: ${error}`);
        return {success: false, message: "Failed to delete a Note!"};
    }
  };

  // Update Note with specific ID
  const updateNote = async (prop: UpdateNotePayload) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/notes/${prop.id}/`, {
            title: prop.title, description: prop.description
        });
        setNotes((prev) => prev.map(note => note.id === prop.id ? response.data : note));
        console.log(response.data);
        return {success: true, message: "Updated a note successfully!", data: response.data};
    } catch (error) {
        console.error(`Error updating a note: ${error}`);
        return {success: false, message: "Failed to update a Note!"};
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

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("You have to wrap your app with NoteProvider!");
  }
  return context;
};
