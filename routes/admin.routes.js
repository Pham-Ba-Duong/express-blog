const express = require('express');
const route = express.Router();
const AdminController = require('../controllers/admin.controller');

route.get('/', AdminController.getAdmin);

route.get('/manage-post', AdminController.getManagePost);
route.get('/manage-post/create', AdminController.getManageCreatePost);
route.post('/manage-post/create', AdminController.postManageCreatePost);
route.get('/manage-post/edit/:id', AdminController.getManagePutPost);
route.put('/manage-post/edit/:id', AdminController.putManagePutPost);
route.delete('/manage-post/:id', AdminController.deleteManagePutPost);

route.get('/manage-category', AdminController.getManageCategory);
route.get('/manage-category/create', AdminController.getManageCreateCategory);
route.post('/manage-category/create', AdminController.postManageCreateCategory);
route.get('/manage-category/edit/:id', AdminController.getManagePutCategory);
route.put('/manage-category/edit/:id', AdminController.putManagePutCategory);
route.delete('/manage-category/:id', AdminController.deleteManagePutCategory);

route.get('/manage-tags', AdminController.getManageTags);

// tag, ...

module.exports = route;