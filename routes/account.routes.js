const express = require('express');
const route = express.Router();
const AccountController = require('../controllers/account.controller')

route.get('/', AccountController.getAccount)

route.get('/forgot-password', (req, res) => {
    res.send('Truy cap thanh cong trang quen mat khau')
})

module.exports = route;

