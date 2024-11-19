const express = require('express');

const route = express.Router();
const CategoryController = require('../controllers/CategoryController')

route.get('/category',CategoryController.getAllCategory);
route.get('/category/:id',CategoryController.getCategoryById);

route.get('/category/create',CategoryController.createCategory);
route.post('/category/create',CategoryController.postCreateCategory);

route.get('/category/update',CategoryController.updateCategory);
route.put('/category/update/:id',CategoryController.postUpdateCategory);

route.get('/category/delete',CategoryController.deleteCategory);
route.delete('/category/delete/:id',CategoryController.postDeleteCategory);

module.exports = route;