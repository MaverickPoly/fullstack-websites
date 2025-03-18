import mongoose from "mongoose";


const UserSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    notes: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Note" },
    ]
}, { timestamps: true });

export const UserModel = mongoose.model("User", UserSchema)
