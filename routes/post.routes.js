const express = require('express');

const route = express.Router();
const PostController = require('../controllers/post.controller');

route.get('/v1/post',PostController.getAllPost);
route.get('/v1/postbycategory',PostController.getAllPostByCategoryId);

route.get('/post/:id',PostController.getPostById);

route.get('/post/create',PostController.createPost);
route.post('/post/create',PostController.postCreatePost);

route.get('/post/update',PostController.updatePost);
route.put('/post/update/:id',PostController.postUpdatePost);

route.get('/post/delete',PostController.deletePost);
route.delete('/post/delete/:id',PostController.postDeletePost);

module.exports = route;