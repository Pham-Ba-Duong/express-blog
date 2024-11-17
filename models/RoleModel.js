const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    permission: {type: String, required: true},
    user: {type: mongoose.Types.ObjectId, ref: 'users'},
    }, 
    {timestamps : true}
);

export const RoleModel = mongoose.model('roles', RoleSchema);
