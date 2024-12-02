const CommentController = require('../controllers/comment.controller');
const express = require('express');
const route = express.Router();

route.get('/api/v1/comment',CommentController.getAllComment);
route.post('/api/v1/comment/create',CommentController.postCreateComment);
route.get('/api/v1/comments-post/:postId',CommentController.getAllCommentsPost);
route.delete('/api/v1/comments-post/:id/',CommentController.deleteDeleteComment);

module.exports = route;