const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema ({
    name: {type: String, required: true},
    description: {type: String, required: true},
    }, 
    {
        collection: 'categories'
    },
    {timestamps : true},
);

const CategoryModel = mongoose.model('categories', CategorySchema);

const play1 = new CategoryModel({'name': 'Dương', 'ddescriptione': "Đà Nẵng"}); play1.save();

module.exports = CategoryModel
