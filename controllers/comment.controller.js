const PostModel = require("../models/post.model");
const CommentModel = require("../models/comment.model")

//Api
exports.getAllComment = async (req, res) => {
    try {
        const comments = await CommentModel.find(); 
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

exports.deleteDeleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    
    const category = await CommentModel.findByIdAndDelete(id);
    
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Failed to delete comment" });
  }
};

exports.postDeleteComment = async (req, res) => {
  const { postId,  id } = req.params;
  console.log(req.params);
  

  try {
      // Xóa comment trong CommentModel
      const deletedComment = await CommentModel.findByIdAndDelete(id);
      // console.log(deletedComment);
      

      if (!deletedComment) {
          return res.status(404).json({ message: "Comment not found" });
      }

      // Xóa commentId trong danh sách comments của Post
      const post = await PostModel.findById(postId);
      if (post) {
          post.comments = post.comments.filter((id) => id.toString() !== id);
          await post.save();
      }

      res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};
