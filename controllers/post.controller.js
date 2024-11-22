const categoryModel = require('../models/category.model');
const PostModel = require('../models/post.model');

exports.getAllPost = async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.json(posts);
      } catch (error) {
        res.status(500).send("Error :" + err.message);
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
    res.json(posts)
  } catch (error) {
    res.status(500).send("Error :" + err.message);
  }
}

exports.getPostById = async (req, res) => {
    const { id } = req.params;
    const post = await PostModel.findById(id)
    res.render('../views/post.details.page.ejs', {post})
};

exports.createPost = () => {
  console.log("Get Create Post");
};

exports.postCreatePost = () => {
  console.log("Post Create Post");
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
