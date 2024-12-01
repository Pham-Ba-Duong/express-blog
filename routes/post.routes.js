const express = require('express');
const route = express.Router();
const upload = require('../middlewares/upload');
const PostController = require('../controllers/post.controller');

//Api
route.get('/v1/posts',PostController.getPostsApi);
route.get('/v1/post-page',PostController.getPostsPageApi);
route.get('/v1/posts/search',PostController.getPostsByTitleApi);
route.get('/v1/posts/:categoryId', PostController.getPostsByCategoryIdApi);
route.get('/v1/post-count/:categoryId', PostController.getPostCountByCategoryIdApi);
route.get('/v1/post/:id',PostController.getPostByIdApi);

//Render
route.get('/post/:id',PostController.getPostById);
route.post('/post/create', upload.single('imageFile'), PostController.postCreatePost);
route.get('/post/update/:id',PostController.getUpdatePost);
route.put('/post/update/:id',upload.single('imageFile'), PostController.postUpdatePost);
route.delete('/post/delete/:id',PostController.postDeletePost);

module.exports = route;