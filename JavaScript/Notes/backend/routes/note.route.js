import express from "express";
import { getAllNotes, getNote, createNote, deleteNote, updateNote } from "../controllers/note.controller.js";
import { authenticateToken } from "../middlewares/middleware.auth.js";

const router = express.Router();


// Get All notes of the user
router.get("/", authenticateToken, getAllNotes);
// Create new note
router.post("/", authenticateToken, createNote);
// Get Specific note
router.get("/:id", authenticateToken, getNote);
// Delete Note
router.delete("/:id", authenticateToken, deleteNote);
// Update Note
router.put("/:id", authenticateToken, updateNote);


export default router;
