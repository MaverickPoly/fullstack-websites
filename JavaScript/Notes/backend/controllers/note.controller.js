import mongoose, { mongo } from "mongoose";
import { NoteModel } from "../models/note.model.js";
import { UserModel } from "../models/user.model.js";


export const getAllNotes = async (req, res) => {
    const id = req.user._id;
    const user = await UserModel.findById(id).populate("notes");
    res.json(user.notes);
}


export const createNote = async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: "All fields are required!" });
    }
    const note = new NoteModel({ title, content, userId: req.user._id });
    const savedNote = await note.save();

    // Adding new note to user's 'notes' field
    await UserModel.findByIdAndUpdate(
        req.user._id,
        { $push: { notes: savedNote._id } },
        { new: true },
    )

    res.status(201).json({ message: "Note created successfully!", data: note });
}

export const getNote = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Note ID!" });
    }
    const note = await NoteModel.findById(id);
    if (!note || note.userId.toString() !== req.user._id) {
        return res.status(404).json({ message: "Note not found!" });
    }
    res.json({ message: "Fetched note successfully!", data: note });
}

export const deleteNote = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Note ID!" });
    }
    const note = await NoteModel.findById(id);
    if (!note || note.userId.toString() !== req.user._id) {
        return res.status(404).json({ message: "Note not found!" });
    }
    await NoteModel.findByIdAndDelete(id);
    res.json({ message: "Note deleted successfully!", data: note });
}

export const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Note ID!" });
    }
    const note = await NoteModel.findById(id);
    if (!note || note.userId.toString() !== req.user._id) {
        return res.status(404).json({ message: "Note not found!" });
    }
    const updatedNote = await NoteModel.findByIdAndUpdate(id, { title, content }, { new: true });
    res.json({ message: "Note Updated successfully!", data: updatedNote });
}
