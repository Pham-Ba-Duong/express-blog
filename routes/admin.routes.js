const express = require('express');
const route = express.Router();
const AdminController = require('../controllers/admin.controller');

route.get('/', AdminController.getAdmin);

route.get('/manage-post', AdminController.getManagePosts);
route.get('/manage-post/create', AdminController.getManageCreatePost);

route.get('/manage-category', AdminController.getManageCategory);
route.get('/manage-category/create', AdminController.getManageCreateCategory);

route.get('/manage-post/comments', AdminController.getCommentsPost);

route.get('/manage-tags', AdminController.getManageTags);

// tag, ...

module.exports = route;