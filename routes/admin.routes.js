const express = require('express');
const route = express.Router();
const AdminController = require('../controllers/admin.controller');

route.get('/', AdminController.getAdmin);

route.get('/manage-post', AdminController.getManagePosts);
route.get('/manage-post/create', AdminController.getManageCreatePost);

route.get('/manage-category', AdminController.getManageCategory);
route.get('/manage-category/create', AdminController.getManageCreateCategory);

route.get('/manage-post/create/create-category-success', AdminController.getCreateCategorySuccess);
route.get('/manage-category/create/create-post-success', AdminController.getCreatePostSuccess);

route.get('/manage-tags', AdminController.getManageTags);

// tag, ...

module.exports = route;