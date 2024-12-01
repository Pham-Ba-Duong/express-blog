const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    post: { type: mongoose.Types.ObjectId, ref: "posts" },
    userName: { type: String, default: "Người dùng ẩn danh"},
  },
  { timestamps: true }
);

module.exports = mongoose.model("CommentEntity", CommentSchema, "comments");
