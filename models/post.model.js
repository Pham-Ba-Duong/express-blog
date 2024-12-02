const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortContent: {type: String, required: true},
    image: {type: String, require: true},
    content: { type: String, required: true },
    comments: [{ type: mongoose.Types.ObjectId, ref: "CommentEntity" }],
    category: { type: mongoose.Types.ObjectId, ref: "CategoryEntity" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PostEntity", PostSchema, "posts");
