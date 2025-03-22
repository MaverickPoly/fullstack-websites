import { createContext, ReactNode, useContext, useState } from "react";
import {
  CommentCreatePayload,
  CommentEditPayload,
  CommentsContextType,
  Comment,
} from "../types";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/comments";

export const CommentsContext = createContext<CommentsContextType | undefined>(
  undefined
);

export const CommentsProvider = ({ children }: { children: ReactNode }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      setComments(response.data);
      return { success: true, message: "Fetched Comments Successfully!" };
    } catch (error) {
      console.error(`Error fetching Comments: ${error}`);
      return { success: false, message: "Error fetching Comments" };
    }
  };

  const createComment = async (data: CommentCreatePayload) => {
    try {
      const response = await axios.post(`${API_URL}/`, data);
      setComments((prev) => [...prev, response.data]);
      return { success: true, message: "Created comment successfully!" };
    } catch (error) {
      console.error(`Error creating Comment: ${error}`);
      return { success: false, message: "Error creating Comment" };
    }
  };

  const getComment = async ({ id }: { id: number }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return {
        success: true,
        message: "Fetched Comment successfully!",
        data: response.data,
      };
    } catch (error) {
      console.error(`Error fetching Comment: ${error}`);
      return { success: false, message: "Error fetching Comment" };
    }
  };

  const deleteComment = async ({ id }: { id: number }) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}/`);
      setComments((prev) => prev.filter((comment) => comment.id !== id));
      return {
        success: true,
        message: "Deleted Comment successfully!",
        data: response.data.data,
      };
    } catch (error) {
      console.error(`Error deleting Comment: ${error}`);
      return { success: false, message: "Error deleting Comment" };
    }
  };

  const updateComment = async ({
    id,
    title,
    content,
    username,
    image_url,
  }: CommentEditPayload) => {
    try {
      const response = await axios.put(`${API_URL}/${id}/`, {
        title,
        content,
        username,
        image_url,
      });
      setComments((prev) =>
        prev.map((comment) => (comment.id === id ? response.data : comment))
      );
      return { success: true, message: "Edited Comment successfully!" };
    } catch (error) {
      console.error(`Error updating Comment: ${error}`);
      return { success: false, message: "Error updating Comment" };
    }
  };

  return (
    <CommentsContext.Provider
      value={{
        comments,
        fetchComments,
        createComment,
        getComment,
        deleteComment,
        updateComment,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};


export const useComments = () => {
    const context = useContext(CommentsContext);
    if (!context) {
        throw new Error("You need to wrap your app with CommentsProvider!");
    }
    return context;
}
