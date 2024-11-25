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

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findById(id);
    if(!category) {
      res.status(400).json('Can not find category with id');
      return;
    }
    res.status(200).json(category);
  } catch(error) {
    res.status(400).json(error.message);
  }
};

exports.createCategory = () => {
  console.log("Get Create category");
};

exports.postCreateCategory = async (req, res) => {
  const { categoryName } = req.body;

  if (!categoryName) {
    return res.status(400).send("Category name is required.");
  }
  try {
    const existingCategory = await CategoryModel.findOne({
      name: categoryName,
    });
    if (existingCategory) {
      return res.render("../views/category-create.ejs", {
        error: "Category name already exists.",
        categoryName,
      });
    }
    const newCategory = new CategoryModel({
      name: categoryName,
    });
    await newCategory.save();
    res.redirect("/admin/manage-post/create/create-category-success");
  } catch (error) {
    console.error("Error creating category: ", error);
    res.status(500).send("Error creating category: " + error.message);
  }
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

