import mongoose from "mongoose";


const NoteSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });


export const NoteModel = mongoose.model("Note", NoteSchema);
