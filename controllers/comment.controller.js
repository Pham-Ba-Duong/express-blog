const PostModel = require("../models/post.model");
const CommentModel = require("../models/comment.model")

//Api
exports.getAllComment = async (req, res) => {
  try {
      const comments = await CommentModel.find()
      .populate({
          path: "post",
          select: "title -_id"
        })
        .exec(); 
      res.status(200).json(comments); 
    } catch (err) {
      console.error("Error fetching comments:", err);
      res.status(500).json({ error: "Failed to fetch comments" });
    }
};

exports.getAllCommentsPost = async (req, res) => {
  const { postId } = req.params;
  if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
  }

  try {
      // console.log("Fetching comments for Post ID:", postId);
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
      console.error("Error fetching comments:", error.message); 
      res.status(500).json({ message: "Error fetching comments for this post", error: error.message });
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

exports.deleteDeleteComment = async (req, res) => {
  try {
    const { id} = req.params;
    // console.log(req.params);
    
    const comment = await CommentModel.findByIdAndDelete(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Failed to delete comment" });
  }
};


//Render
exports.getCommentsPost = async (req, res) => {
  const { postId } = req.params;
  res.render('../views/comments-post.ejs', { postId });
};
