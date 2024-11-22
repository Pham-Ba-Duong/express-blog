const express = require('express');

const route = express.Router();
const UserController = require('../controllers/UserController')

route.get('/user',UserController.getAllUser);
route.get('/user/:id',UserController.getUserById);

route.get('/user/create',UserController.createUser);
route.post('/user/create',UserController.postCreateUser);

route.get('/user/update',UserController.updateUser);
route.put('/user/update/:id',UserController.postUpdateUser);

route.get('/user/delete',UserController.deleteUser);
route.delete('/user/delete/:id',UserController.postDeleteUser);

module.exports = route;