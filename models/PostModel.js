const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema ({
    title: {type: String, required: true},
    image: {type: String, required: true},
    content: {type: String, required: true},
    category: {type: mongoose.Types.ObjectId, ref: 'categories'},
    user: {type: mongoose.Types.ObjectId, ref: 'users'},
    }, 
    {timestamps : true}
);

export const PostModel = mongoose.model('posts', PostSchema);
