const PostModel = require("../models/post.model");
const CommentModel = require("../models/comment.model")

exports.getAllComment = async (req, res) => {
    try {
        const comments = await CommentModel.find().populate(); 
        res.status(200).json(comments); 
      } catch (err) {
        console.error("Error fetching comments:", err);
        res.status(500).json({ error: "Failed to fetch comments" });
      }
};

exports.getAllCommentsPage = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Trang hiện tại
      const limit = parseInt(req.query.limit) || 10; // Số comment mỗi trang
      const skip = (page - 1) * limit;
  
      // Lấy comment theo trang
      const comments = await CommentModel.find()
        .skip(skip)
        .limit(limit)
        .populate('post', 'title');
        
      const totalComments = await CommentModel.countDocuments();
  
      res.status(200).json({
        totalComments,
        totalPages: Math.ceil(totalComments / limit),
        currentPage: page,
        comments,
      });
    } catch (err) {
      console.error("Error fetching comments:", err);
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  };

exports.getCommentById = (req, res) => {
  const { id } = req.params;
  console.log(id);
};

exports.createComment = (req, res) => {
    
};

exports.postCreateComment = async (req, res) => {
    const { content, postId, name, email } = req.body;
    console.log(req.params);

    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = new CommentModel({
      content,
      post: postId,
      name,
      email,
    });
  
    try {
      const savedComment = await comment.save();

      if (!Array.isArray(post.comments)) {
        post.comments = [];
      }
  
      post.comments.push(savedComment._id); 
      await post.save();

      res.status(201).json(savedComment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

// exports.postCreateComment = (req, res) => {
//   try {
//     const { content, user } = req.body;
//     const newComment = PostModel.findOneAndUpdate(
//       { _id: req.body._id },
//       { comment: { content: req.body.content, user: req.body.user.name } }
//     );

//     if (newComment) {
//       res.status(201).json(newComment);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

exports.updateComment = (req, res) => {
  console.log("Update comment");
};

exports.postUpdateComment = (req, res) => {
  console.log("Update comment");
};

exports.deleteComment = (req, res) => {
  console.log("Delete comment");
};

exports.postDeleteComment = (req, res) => {
  console.log("Update comment");
};
