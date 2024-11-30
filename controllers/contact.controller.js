const express = require('express');

exports.getContact = (req, res) => {
    res.render('../views/contact.page.ejs');
}