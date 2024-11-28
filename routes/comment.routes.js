const CommentController = require('../controllers/comment.controller');
const express = require('express');
const route = express.Router();

route.get('/api/v1/comment',CommentController.getAllComment);
route.post('/api/v1/comment',CommentController.postCreateComment);
route.post('/api/v1/comment-page',CommentController.getAllCommentsPage);

route.get('/comment/:id',CommentController.getCommentById);

route.get('/comment/create',CommentController.createComment);

route.get('/comment/update',CommentController.updateComment);
route.put('/comment/update/:id',CommentController.postUpdateComment);

route.get('/comment/delete',CommentController.deleteComment);
route.delete('/comment/delete/:id',CommentController.postDeleteComment);

module.exports = route;