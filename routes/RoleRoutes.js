const express = require('express');

const route = express.Router();
const RoleController = require('../controllers/RoleController')

route.get('/role',RoleController.getAllRole);
route.get('/role/:id',RoleController.getRoleById);

route.get('/role/create',RoleController.createRole);
route.post('/role/create',RoleController.postCreateRole);

route.get('/role/update',RoleController.updateRole);
route.put('/role/update/:id',RoleController.postUpdateRole);

route.get('/role/delete',RoleController.deleteRole);
route.delete('/role/delete/:id',RoleController.postDeleteRole);

module.exports = route;