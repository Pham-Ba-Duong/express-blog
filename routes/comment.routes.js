const CommentController = require('../controllers/comment.controller');
const express = require('express');
const route = express.Router();

route.get('/api/v1/comment',CommentController.getAllComment);
route.post('/api/v1/comment',CommentController.postCreateComment);
route.get('/api/v1/comments-post/:postId',CommentController.getAllCommentsPost);

route.delete('/comment/delete/:id',CommentController.postDeleteComment);

module.exports = route;