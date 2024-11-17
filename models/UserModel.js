const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    avatar: {type: String, required: false},
    role: {type: mongoose.Types.ObjectId, ref: 'roles'},
    }, 
    {timestamps : true}
);

export const UserModel = mongoose.model('users', UserSchema);
