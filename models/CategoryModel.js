const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema ({
    name: {type: String, required: true},
    description: {type: String, required: true},
    }, 
    {
        collection: 'categories',
        timestamps : true
    },
);

const CategoryModel = mongoose.model('categories', CategorySchema);
module.exports = CategoryModel;
