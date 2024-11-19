const express = require('express');

const route = express.Router();
const CommentController = require('../controllers/CommentController')

route.get('/comment',CommentController.getAllComment);
route.get('/comment/:id',CommentController.getCommentById);

route.get('/comment/create',CommentController.createComment);
route.post('/comment/create',CommentController.postCreateComment);

route.get('/comment/update',CommentController.updateComment);
route.put('/comment/update/:id',CommentController.postUpdateComment);

route.get('/comment/delete',CommentController.deleteComment);
route.delete('/comment/delete/:id',CommentController.postDeleteComment);

module.exports = route;