const mongoose = require('mongoose'); 
const CategoryModel = require("../models/category.model");
const PostModel = require("../models/post.model");

//Api
exports.getPostsApi = async (req, res) => {
  try {
    const posts = await PostModel.find()
    .sort({ createdAt: -1 })
    .populate(
      {
        path: "category",
        select: "name -_id"
      }
    ).exec();
    res.json(posts);
  } catch (error) {
    res.status(500).send("Error :" + error.message);
  }
};

exports.getPostsPageApi = async (req, res) => {
  try {
    const { page = 1, limit = 6 } = req.query;
    const posts = await PostModel.find()
      .skip((page - 1) * limit) 
      .limit(limit); 
    const totalPosts = await PostModel.countDocuments(); 
    // console.log(posts.length);
    // console.log(totalPosts);

    const response = {
      posts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page
    };
    // console.log(response.currentPage);
    res.json(response);
  } catch (error) {
    res.status(500).send("Error :" + error.message);
  }
};

exports.getPostsByTitleApi = async (req, res) => {
  try {
    const postSearch = req.query.search;

    if (!postSearch || postSearch.trim() === '') {
      return res.status(400).json({ message: 'Search query is empty.' });
    }

    const regex = new RegExp(postSearch, 'i');
    const postFound = await PostModel.find({ title: { $regex: regex } });

    if (postFound.length === 0) {
      return res.status(400).json("Cannot find posts.");
    }

    res.status(200).json(postFound);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPostsByCategoryIdApi = async (req, res) => {
  const { categoryId } = req.params; 
  try {
    const posts = await PostModel.find({ category: categoryId });
    if (!posts.length) {
      return res.status(404).json({ message: 'No posts found for this category' });
    }
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts for this category' });
  }
};

exports.getPostCountByCategoryIdApi = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const count = await PostModel.countDocuments({ category: categoryId });
    res.json({ categoryId, count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post count for this category' });
  }
};

exports.getPostByIdApi = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    const post = await PostModel.findById(id).populate({
      path: "comments",
      model: "CommentEntity",
      select: "_id content post userName",
    }).exec();
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const image = post.image ? post.image.replace("assets\\", "\\") : "";

    res.status(200).json(post);
  } catch (err) {
    console.error("Error in getPostById:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


//Render
exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    const post = await PostModel.findById(id)

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const image = post.image ? post.image.replace("assets\\", "\\") : "";

    res.render("../views/post.details.page.ejs", { post, image });
  } catch (err) {
    console.error("Error in getPostById:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.postCreatePost = async (req, res) => {
  const { title, shortContent, txaContent , category } = req.body;
  // console.log("Body:", req.body);
  // console.log("File:", req.file); 
  try {
    const existingPost = await PostModel.findOne({ title, category });
    if (existingPost) {
      res.status(400).json("Post is exist");
      return;
    };

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required!' });
    }

    const imagePath = req.file.path;
    console.log("Image:", imagePath); 

    const post = new PostModel({
      title: title,
      shortContent: shortContent,
      content: txaContent,
      image: imagePath, 
      category: category,
    });
    if (!post) {
      res.status(400).json("Cannot create post");
      return;
    }
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error("Error creating post:", err); 
    res.status(500).json("Error occured when trying create post");
  }
};

exports.getUpdatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.render('post-edit.ejs', { post }); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving post data');
  }
};

exports.postUpdatePost = async (req, res) => {
  try {
    
    const { title, shortContent, txaContent , category } = req.body;
    const image = req.file ? req.file.path : null;
    console.log("Request Body:", req.body);
    console.log("Request Params:", image);
    
    const updatedPost = await PostModel.findByIdAndUpdate(
      req.params.id, 
      {
        title: title,
        shortContent: shortContent,
        content: txaContent,
        category: category,
        image: image,
      }, { new: true, runValidators: true });

    console.log(updatedPost);
    
    if (!updatedPost) {
      return res.status(404).send('Post not found');
    }
    res.status(200).json(updatedPost)
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating post');
  }
};

exports.postDeletePost = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    
    const post = await PostModel.findByIdAndDelete(id);
    
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Failed to delete post" });
  }
}