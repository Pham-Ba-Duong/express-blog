const express = require('express');
const upload = require('../middlewares/upload');

const route = express.Router();
const PostController = require('../controllers/post.controller');

route.get('/v1/posts',PostController.getAllPostApi);
route.get('/v1/posts/search',PostController.getPostByTitle);
route.get('/v1/post-page',PostController.getPostApiPage);
route.get('/v1/posts/:categoryId', PostController.getAllPostByCategoryId);

route.get('/post/:id',PostController.getPostById);

route.get('/post/create', PostController.getCreatePost);
route.post('/v1/posts', upload.single('imageFile'), PostController.postCreatePost);

route.get('/post/update/:id',PostController.getUpdatePost);
route.put('/post/update/:id',upload.single('imageFile'), PostController.postUpdatePost);

route.get('/post/delete/:id',PostController.deletePost);
route.delete('/post/delete/:id',PostController.postDeletePost);

module.exports = route;