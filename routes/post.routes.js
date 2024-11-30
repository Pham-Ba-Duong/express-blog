const express = require('express');
const route = express.Router();
const upload = require('../middlewares/upload');
const PostController = require('../controllers/post.controller');

route.get('/v1/posts',PostController.getPostsApi);
route.get('/v1/post-page',PostController.getPostsApiPage);
route.get('/v1/posts/search',PostController.getPostsByTitle);
route.get('/post/:id',PostController.getPostById);
route.get('/v1/posts/:categoryId', PostController.getPostsByCategoryId);
route.get('/v1/post-count/:categoryId', PostController.getPostCountByCategoryId);

route.post('/v1/posts', upload.single('imageFile'), PostController.postCreatePost);//chooo nay

route.get('/post/update/:id',PostController.getUpdatePost);
route.put('/post/update/:id',upload.single('imageFile'), PostController.postUpdatePost);

route.delete('/post/delete/:id',PostController.postDeletePost);

module.exports = route;