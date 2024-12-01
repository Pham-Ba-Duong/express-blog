const PostModel = require("../models/post.model");
const CommentModel = require("../models/comment.model")

//Api
exports.getAllComment = async (req, res) => {
    try {
        const comments = await CommentModel.find().populate(); 
        res.status(200).json(comments); 
      } catch (err) {
        console.error("Error fetching comments:", err);
        res.status(500).json({ error: "Failed to fetch comments" });
      }
};

exports.postCreateComment = async (req, res) => {
  const { content, postId } = req.body;

  const post = await PostModel.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const comment = new CommentModel({
    content,
    post: postId,
  });

  try {
    const savedComment = await comment.save();

    post.comments.push(savedComment._id); 
    await post.save();

    res.status(201).json(savedComment);
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCommentsPost = async (req, res) => {
  const { postId } = req.params;

  if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
  }

  try {
      console.log("Fetching comments for Post ID:", postId); // Log postId để kiểm tra
      const commentsFound = await PostModel.findById(postId).populate({
          path: 'comments',
          model: "CommentEntity",
          select: 'userName content createdAt',
          options: { sort: { createdAt: -1 } }
      });

      if (!commentsFound) {
          return res.status(404).json({ message: "Post not found" });
      }

      res.json(commentsFound.comments || []);
  } catch (error) {
      console.error("Error fetching comments:", error.message); // Log lỗi chi tiết
      res.status(500).json({ message: "Error fetching comments for this post", error: error.message });
  }
};


//---
exports.postDeleteComment = (req, res) => {
  console.log("Update comment");
};
