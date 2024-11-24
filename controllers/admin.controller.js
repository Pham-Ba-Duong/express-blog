const CategoryModel = require("../models/category.model");
const PostModel = require("../models/post.model");

exports.getAdmin = (req, res) => {
  res.render("../views/admin.page.ejs");
};

//Post--------------
exports.getManagePosts = (req, res) => {
  res.render("../views/post-admin.ejs");
};

exports.getManageCreatePost = (req, res) => {
  res.render("../views/post-create.ejs");
};

exports.postManageCreatePost = async (req, res) => {
    const { title, txaContent, category } = req.body;
    console.log("Headers:", req.headers); 
    console.log("Received data:", req.body); 
  
    // Kiểm tra các trường dữ liệu
    if (!title || !txaContent || !category) {
        console.log("Missing fields:", req.body);
      return res.render("../views/post-create.ejs", {
        error: "All fields are required.",
        title,
        txaContent,
        category,
      });
    }
  
    try {
      const existingPost = await PostModel.findOne({ title });
      if (existingPost) {
        return res.render("../views/post-create.ejs", {
          error: "Post title already exists.",
          title,
          txaContent,
          category,
        });
      }
  
      const existingCategory = await CategoryModel.findOne({ name: category });
      if (!existingCategory) {
        return res.render("../views/post-create.ejs", {
          error: "Category does not exist.",
          title,
          txaContent,
          category,
        });
      }
  
      const newPost = new PostModel({
        title,
        content: txaContent,
        category,
      });
  
      await newPost.save();
      res.redirect("/admin/manage-post/create/create-post-success");
    } catch (error) {
      console.error("Error creating post: ", error);
      res.status(500).send("Error creating post: " + error.message);
    }
};

exports.getManagePutPost = (req, res) => {
  res.render("");
};

exports.putManagePutPost = (req, res) => {
  res.render("");
};

exports.deleteManagePutPost = (req, res) => {
  res.render("");
};

//Category----------
exports.getManageCategory = (req, res) => {
  res.render("../views/category-admin.ejs");
};

exports.getManageCreateCategory = (req, res) => {
  res.render("../views/category-create.ejs");
};

exports.postManageCreateCategory = async (req, res) => {
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

exports.getManagePutCategory = (req, res) => {
  res.render("");
};

exports.putManagePutCategory = (req, res) => {
  res.render("");
};

exports.deleteManagePutCategory = (req, res) => {
  res.render("");
};

exports.getCreateCategorySuccess = (req, res) => {
  res.render("../views/partials/create-category-success.ejs");
};
exports.getCreatePostSuccess = (req, res) => {
  res.render("../views/partials/create-post-success.ejs");
};

//Tags
exports.getManageTags = (req, res) => {
  res.render("");
};
