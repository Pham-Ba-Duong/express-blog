const express = require('express');
const app = express();
const mongoose = require('mongoose');

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

connectDatabase().then(() => {
    app.listen(port, function() {
        console.log("Server is running at: " + port);
    })
}).catch((err) => console.log('Connect database failed:', err));

// const CategoryModel = require('./models/CategoryModel')
// connectDatabase().then( () => {
//     const cate1 = new CategoryModel({ name: 'Dương2', description: 'Đà Nẵng22' });
//     cate1.save()
//         .then(() => console.log('Data saved successfully'))
//         .catch(err => console.log('Failed to save data:', err));
// }).catch((err) => console.log('Connect database failed:', err));