const mongoose = require('mongoose'); 
// const fs = require('fs');
const CategoryModel = require("../models/category.model");
const PostModel = require("../models/post.model");

exports.getPostByTitle = async (req, res) => {
  try {
    var postSearch = req.query.search;
    const postFound = await PostModel.find({title: postSearch});
    // include()
    // contain()
    // const postFound = await PostModel.filter((item) => item.contain(postSearch))
    // reduce()
    // rest (JS ES6)
    // {...rest, data}
    if(!postFound) {
      res.status(400).json("Can not find post !");
    }
    res.status(200).json(postFound);
  } catch(err) {
    res.status(400).json(err.message);
  }
}

exports.getPostApiPage = async (req, res) => {
  try {
    const { page = 1, limit = 4 } = req.query;
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
    const posts = await PostModel.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).send("Error :" + error.message);
  }
};

exports.getAllPostByCategoryId = async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error("Invalid category ID format");
        return;
    }
    const { id } = req.params;
    // console.log(`Category ID: ${id}`);

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
// exports.getAllPostByCategoryId  = async (req, res) => {
//   try {
//     const { categoryId } = req.params;
//     const posts = await PostModel.find({ categoryId });
//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ message: "Lỗi khi lấy bài viết" });
//   }
// }

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await PostModel.findById(id);

  let image = post.image
  ? post.image.replace("assets\\", "\\")
  : "";

  res.render("../views/post.details.page.ejs", { post, image });
};

exports.getCreatePost = () => {
  console.log("Get Create Post");
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
}