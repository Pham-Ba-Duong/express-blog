const CategoryModel = require("../models/category.model");
// const PostModel = require("../models/post.model");

exports.getCategory = (req, res) => {
  res.render('category.page.ejs')
};

exports.getCategoryApi = async (req, res) => {
  try {
    const listCategory = await CategoryModel.find();
    res.json(listCategory);
  } catch (error) {
    console.log(error);
  }
};

// exports.getAllPostItem = (req, res) => {
//     const posts = PostModel.find();
//     if (!posts || posts.length === 0) {
//              console.log('No posts found');
//              return res.render('partials/post.item.ejs', { posts: [] });
//          }

//          res.render('partials/post.item.ejs', { posts });
//          console.log(posts);
//          console.log('render success')

//     // res.send("day la post item")
// }

exports.getCategoryById = (req, res) => {
  const { id } = req.params;
  console.log(id);
};

exports.createCategory = () => {
  console.log("Get Create category");
};

exports.postCreateCategory = () => {
  console.log("Post Create category");
};

exports.updateCategory = (req, res) => {
  console.log("Update category");
};

exports.postUpdateCategory = (req, res) => {
  console.log("Update category");
};

exports.deleteCategory = (req, res) => {
  console.log("Delete category");
};

exports.postDeleteCategory = (req, res) => {
  console.log("Update category");
};
