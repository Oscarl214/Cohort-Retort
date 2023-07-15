const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema({
  comment: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => date.toISOString().split("T")[0],
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
