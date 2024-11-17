const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 8000;
const db = 'mongodb://localhost/BlogDB';

const connectDatabase = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true});
        console.log("Connect database successfully");
    } catch (error) {
        console.log("Connect database failed");
    }
}

app.use('/', function(req, res) {
    res.send('Hello world !');
})

connectDatabase().then(() => {
    app.listen(port, function() {
        console.log("Server is running at: " + port);
    })
}).catch((err) => console.log(err))
