const categoryModel = require("../models/category.model");
const PostModel = require("../models/post.model");

exports.getPostApiPage = async (req, res) => {
  try {
    const { page = 1, limit = 3 } = req.query;
    const posts = await PostModel.find()
      .skip((page - 1) * limit) 
      .limit(limit); 
    const totalPosts = await PostModel.countDocuments(); 
    // console.log(posts.length);
    // console.log(totalPosts);
    
    res.json({
      posts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit), 
      currentPage: page
    });
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
    const { id } = req.body;
    // category id
    // get the category
    // get posts of that category

    const category = categoryModel.findById(id);
    const posts = category.find();
    res.json(posts);
  } catch (error) {
    res.status(500).send("Error :" + err.message);
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await PostModel.findById(id);
  res.render("../views/post.details.page.ejs", { post });
};

exports.createPost = () => {
  console.log("Get Create Post");
};

exports.postCreatePost = async (req, res) => {
  const { title, shortContent, content, category } = req.body;
  try {
    const existingPost = await PostModel.findOne({ title, category });
    if (existingPost) {
      res.status(400).json("Post is exist");
      return;
    }
    const post = new PostModel({
      title: title,
      shortContent: shortContent,
      content: content,
      category: category,
    });
    if (!post) {
      res.status(400).json("Cannot create post");
      return;
    }
    post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json("Error occured when trying create post");
  }
};

exports.updatePost = (req, res) => {
  console.log("Update Post");
};

exports.postUpdatePost = (req, res) => {
  console.log("Update Post");
};

exports.deletePost = (req, res) => {
  console.log("Delete Post");
};

exports.postDeletePost = (req, res) => {
  console.log("Update Post");
};
