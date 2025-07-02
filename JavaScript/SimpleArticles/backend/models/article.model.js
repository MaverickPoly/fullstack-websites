const mongoose = require("mongoose");



const ArticleSchema = mongoose.Schema({
    title: {type: String, required: true, trim: true},
    content: {type: String, required: true, trim: true},
    userId: {type: mongoose.Types.ObjectId, ref: "User"},
    category: {type: String, trim: true},
}, {timestamps: true});


const ArticleModel = mongoose.model("Article", ArticleSchema)


module.exports = {ArticleModel}
