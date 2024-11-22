const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: false },
    content: { type: String, required: true },
    category: { type: mongoose.Types.ObjectId, ref: "categories" },
    user: { type: mongoose.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PostEntity", PostSchema, "posts");
