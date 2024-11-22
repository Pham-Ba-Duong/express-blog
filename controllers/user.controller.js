exports.getAllUser = (req, res) => {
    res.render('User');
}

exports.getUserById = (req, res) => {
    const { id } = req.params;
    console.log(id);
}

exports.createUser = () => {
    console.log('Get Create User')
}

exports.postCreateUser = () => {
    console.log('Post Create User')
}

exports.updateUser = (req, res) => {
    console.log('Update User')
}

exports.postUpdateUser = (req, res) => {
    console.log('Update User')
}

exports.deleteUser = (req, res) => {
    console.log('Delete User')
}

exports.postDeleteUser = (req, res) => {
    console.log('Update User')
}