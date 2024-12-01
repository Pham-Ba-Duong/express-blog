const CategoryModel = require("../models/category.model");

//Api
exports.getCategoryApi = async (req, res) => {
  try {
    const listCategory = await CategoryModel.find().sort({ createdAt: -1 });
    res.json(listCategory);
  } catch (error) {
    res.status(500).send("Error :" + error.message);
  }
};

//Render
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

exports.getUpdateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).send('Category not found');
    }
    res.render('category-edit.ejs', { category }); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving category data');
  }
};

exports.postUpdateCategory = async (req, res) => {
  try {
    
    const { categoryName } = req.body;
    // console.log("Request Body:", req.body);
    
    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      req.params.id, 
      {
        name: categoryName
      }, { new: true, runValidators: true });

    console.log(updatedCategory);
    
    if (!updatedCategory) {
      return res.status(404).send('Category not found');
    }
    res.status(200).json(updatedCategory)
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating category');
  }
};

exports.postDeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    
    const category = await CategoryModel.findByIdAndDelete(id);
    
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Failed to delete category" });
  }
};

