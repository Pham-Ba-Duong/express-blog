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
    res.status(500).send("Error :" + error.message);
  }
};

exports.getPopularCategoryData = async () => {
  try {
      const postApi = "http://localhost:8000/v1/category";
      const response = await fetch(postApi);
      const posts = await response.json();
      return posts; 
  } catch (error) {
      console.error("Error fetching category data:", error);
      return []; 
  }
};

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

