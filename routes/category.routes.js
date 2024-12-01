const express = require('express');
const route = express.Router();
const CategoryController = require('../controllers/category.controller')

//Api
route.get('/v1/category', CategoryController.getCategoryApi);

//Render
route.get('/category/:id',CategoryController.getCategoryById);
route.post('/category/create',CategoryController.postCreateCategory);
route.get('/category/update/:id',CategoryController.getUpdateCategory);
route.put('/category/update/:id',CategoryController.postUpdateCategory);
route.delete('/category/delete/:id',CategoryController.postDeleteCategory);

module.exports = route;