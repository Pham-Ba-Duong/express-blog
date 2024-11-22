const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    post: { type: mongoose.Types.ObjectId, ref: "posts" },
    user: { type: mongoose.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CommentEntity", CommentSchema, "comments");
