const express = require('express');
const app = express();
const mongoose = require('mongoose');
const CategoryModel = require('./models/CategoryModel');
const CommentModel = require('./models/CommentModel');
const PostModel = require('./models/PostModel');
const RoleModel = require('./models/RoleModel');
const UserModel = require('./models/UserModel');


const port = 8000;
const db = 'mongodb://localhost/BlogDB';

const connectDatabase = async () => {
    try {
        await mongoose.connect(db);
        console.log("Connect database successfully");
    } catch (err) {
        console.error("Connect database failed:", err);
        process.exit(1);
    }
}

app.use('/', function(req, res) {
    res.send('Hello world !');
})

const createDB = () => {
    const newUser = new UserModel({
        name: 'Pham Ba Duong',
        email: 'duong101118@gmail.com',
        password: '12345',
        avatar: '',
    });

    const newRole = new RoleModel({
        name: 'user',
        permission: 'read'
    });

    const newPost = new PostModel({
        title: 'Tin tức bóng đá',
        image: '',
        content: 'content',
    });

    const newCategory = new CategoryModel({
        name: 'Duong',
        description: 'Description'
    });

    const newComment = new CommentModel({
        content: 'content',

    });

    try {
        newUser.save();
        newRole.save();
        newCategory.save();
        newPost.save();
        newComment.save();
        console.log('Du lieu da duoc them');
    } catch (err) {
        console.log(err);
    }
}

// createDB();

connectDatabase().then(() => {
    app.listen(port, function() {
        console.log("Server is running at: " + port);
    })
}).catch((err) => console.log('Connect database failed:', err));
