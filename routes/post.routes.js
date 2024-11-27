const express = require('express');

const route = express.Router();
const PostController = require('../controllers/post.controller');

route.get('/v1/posts',PostController.getAllPostApi);
route.get('/v1/post-page',PostController.getPostApiPage);
route.get('/v1/posts-bycategory/:id',PostController.getAllPostByCategoryId);

route.get('/post/:id',PostController.getPostById);

route.get('/post/create',PostController.createPost);
route.post('/v1/post',PostController.postCreatePost);

route.get('/post/update/:id',PostController.updatePost);
route.put('/post/update/:id',PostController.postUpdatePost);

route.get('/post/delete/:id',PostController.deletePost);
route.delete('/post/delete/:id',PostController.postDeletePost);

module.exports = route;