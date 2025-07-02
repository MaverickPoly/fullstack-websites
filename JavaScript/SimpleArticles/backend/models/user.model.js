const mongoose = require("mongoose");


const UserSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true, trim: true},
    email: {type: String, required: true, unique: true, trim: true},
    password: {type: String, required: true},
    articles: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Article"},
    ]
}, {timestamps: true});

const UserModel = mongoose.model("User", UserSchema)

module.exports = {UserModel};
