exports.getAllRole = (req, res) => {
    res.render('Role');
}

exports.getRoleById = (req, res) => {
    const { id } = req.params;
    console.log(id);
}

exports.createRole = () => {
    console.log('Get Create Role')
}

exports.postCreateRole = () => {
    console.log('Post Create Role')
}

exports.updateRole = (req, res) => {
    console.log('Update Role')
}

exports.postUpdateRole = (req, res) => {
    console.log('Update Role')
}

exports.deleteRole = (req, res) => {
    console.log('Delete Role')
}

exports.postDeleteRole = (req, res) => {
    console.log('Update Role')
}