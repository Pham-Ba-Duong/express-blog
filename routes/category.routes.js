const express = require('express');

const route = express.Router();
const CategoryController = require('../controllers/category.controller')

route.get('/category',CategoryController.getCategory);

// http://localhost:8000/category/v1/getCategory
route.get('/v1/category', CategoryController.getCategoryApi);

// route.get('/category',CategoryController.getAllCategory);
route.get('/category/:id',CategoryController.getCategoryById);

route.get('/category/create',CategoryController.createCategory);
route.post('/category/create',CategoryController.postCreateCategory);

route.get('/category/update/:id',CategoryController.getUpdateCategory);
route.put('/category/update/:id',CategoryController.postUpdateCategory);

route.get('/category/delete',CategoryController.deleteCategory);
route.delete('/category/delete/:id',CategoryController.postDeleteCategory);

module.exports = route;