const mongoose = require('mongoose'); 
// const fs = require('fs');
const CategoryModel = require("../models/category.model");
const PostModel = require("../models/post.model");

exports.getPostApiPage = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const posts = await PostModel.find()
      .skip((page - 1) * limit) 
      .limit(limit); 
    const totalPosts = await PostModel.countDocuments(); 
    // console.log(posts.length);
    // console.log(totalPosts);

    // if (page > totalPages) {
    //   console.error("Page number exceeds total pages.");
    //   return;
    // }

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

exports.getAllPostApi = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.json(posts);
  } catch (error) {
    res.status(500).send("Error :" + error.message);
  }
};

exports.getAllPostByCategoryId = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(`Category ID: ${id}`);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid category ID format" });
    }

    const category = await CategoryModel.findById(id);
    // console.log("Category by id" + category);
    

    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }

    const posts = await PostModel.find({ category: id });
    // console.log(posts);
    
    res.json({
      category: category.name, 
      posts,                   
    });
  } catch (error) {
      console.error("Error fetching posts:", error.message);
      res.status(500).send("Error: " + error.message);
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await PostModel.findById(id);
  // console.log(post);
  
  // const createdAt = new Date(item.createdAt).toLocaleDateString();
  res.render("../views/post.details.page.ejs", { post });
};

exports.createPost = () => {
  console.log("Get Create Post");
};

exports.postCreatePost = async (req, res) => {
  const { title, shortContent, txaContent , category } = req.body;
  console.log("Body:", req.body);
  console.log("File:", req.file); 
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

exports.updatePost = (req, res) => {
  console.log("Display Update Post Form");
};

exports.postUpdatePost = (req, res) => {
  console.log("Update Post");
};

exports.deletePost = (req, res) => {
  console.log("Display Delete Post Confirmation");
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
};