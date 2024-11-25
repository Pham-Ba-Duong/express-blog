const express = require('express');
const app = express();
const mongoose = require('mongoose');
const CategoryModel = require('./models/category.model');
const CommentModel = require('./models/comment.model');
const PostModel = require('./models/post.model');
const UserModel = require('./models/user.model');
const CategoryRoutes = require('./routes/category.routes');
const PostRoutes = require('./routes/post.routes');
const AccountRoutes = require('./routes/account.routes');
const AdminRoutes = require('./routes/admin.routes');
const BodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const multer = require('multer');
const upload = multer();

const port = 8000;
const db = 'mongodb://localhost/BlogDB';

app.set("view engine","ejs");
app.set("views","./views");

app.use(cors('*'))

app.use(express.static('assets'));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('app');
})

app.use('/', PostRoutes);
app.use('/', CategoryRoutes);
app.use('/', AccountRoutes);
app.use('/admin', AdminRoutes);


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

app.post('/uploadfile',multipartMiddleware,(req,res)=>{
    try {
        fs.readFile(req.files.upload.path, function (err, data) {
            var newPath = __dirname + '/assets/images/' + req.files.upload.name;
            fs.writeFile(newPath, data, function (err) {
                if (err) console.log({err: err});
                else {
                    console.log(req.files.upload.originalFilename);
                 
                    let fileName = req.files.upload.name;
                    let url = '/images/'+fileName;                    
                    let msg = 'Upload successfully';
                    let funcNum = req.query.CKEditorFuncNum;
                    console.log({url,msg,funcNum});
                   
                    res.status(201).send("<script>window.parent.CKEDITOR.tools.callFunction('"+funcNum+"','"+url+"','"+msg+"');</script>");
                }
            });
        });
       } catch (error) {
           console.log(error.message);
       }
})


connectDatabase().then(() => {
    app.listen(port, function() {
        console.log("Server is running at: " + port);
    })
}).catch((err) => console.log('Connect database failed:', err));
