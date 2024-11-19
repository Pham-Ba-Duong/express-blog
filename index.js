const express = require('express');
const app = express();
const mongoose = require('mongoose');
const CategoryModel = require('./models/CategoryModel');
const CommentModel = require('./models/CommentModel');
const PostModel = require('./models/PostModel');
const RoleModel = require('./models/RoleModel');
const UserModel = require('./models/UserModel');
const CategoryRoutes = require('./routes/CategoryRoutes');

const port = 8000;
const db = 'mongodb://localhost/BlogDB';

app.set("view engine","ejs");
app.set("views","./views");

app.use(express.static('assets'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('app');
})
// app.use('/', CategoryRoutes);
app.use('/category', CategoryRoutes);

const connectDatabase = async () => {
    try {
        await mongoose.connect(db);
        console.log("Connect database successfully");
    } catch (err) {
        console.error("Connect database failed:", err);
        process.exit(1);
    }
}

const createDB = () => {
    const newUser = new UserModel({
        name: 'Pham Ba Duong',
        email: 'duong101118@gmail.com',
        password: '12345',
        avatar: '',
    });

    const newRole = new RoleModel({
        name: 'user2',
        permission: 'create'
    });

    const newPost = new PostModel({
        title: 'Lamborghini Veneno',
        image: '',
        content: 'Lamborghini Veneno là chú bò tót được Neymar yêu thích nhất.',
    });

    const newCategory = new CategoryModel({
        name: 'Supercar',
        // description: 'Description'
    });

    const newComment = new CommentModel({
        content: 'Nó rất đẹp',

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


