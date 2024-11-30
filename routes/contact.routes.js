const express = require('express');
const route = express.Router();
const ContactController = require('../controllers/contact.controller')

route.get('/contact', ContactController.getContact);

module.exports = route