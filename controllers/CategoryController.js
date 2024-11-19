const Category = require("../models/CategoryModel");

exports.getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        res.render('app', { categories})
    } catch (err) {
        res.status(500).send("Error :" + err.message);
    }

}

exports.getCategoryById = (req, res) => {
    const { id } = req.params;
    console.log(id);
}

exports.createCategory = () => {
    console.log('Get Create category')
}

exports.postCreateCategory = () => {
    console.log('Post Create category')
}

exports.updateCategory = (req, res) => {
    console.log('Update category')
}

exports.postUpdateCategory = (req, res) => {
    console.log('Update category')
}

exports.deleteCategory = (req, res) => {
    console.log('Delete category')
}

exports.postDeleteCategory = (req, res) => {
    console.log('Update category')
}