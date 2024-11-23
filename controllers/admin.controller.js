
exports.getAdmin =  (req, res) => {
    res.render('../views/admin.page.ejs');
}

//Post--------------
exports.getManagePost =  (req, res) => {
    res.render('../views/post-admin.ejs');
}

exports.getManageCreatePostContent = (req, res) => {
    res.render('../views/post-ckediter.ejs');
}

exports.getManageCreatePost =  (req, res) => {
    res.render('../views/post-create.ejs');
}

exports.postManageCreatePost =  (req, res) => {
    res.render('');
}

exports.getManagePutPost =  (req, res) => {
    res.render('');
}

exports.putManagePutPost =  (req, res) => {
    res.render('');
}

exports.deleteManagePutPost =  (req, res) => {
    res.render('');
}


//Category----------
exports.getManageCategory =  (req, res) => {
    res.render('../views/category-admin.ejs');
}

exports.getManageCreateCategory =  (req, res) => {
    res.render('../views/category-create.ejs');
}

exports.postManageCreateCategory =  (req, res) => {
    res.render('');
}

exports.getManagePutCategory =  (req, res) => {
    res.render('');
}

exports.putManagePutCategory =  (req, res) => {
    res.render('');
}

exports.deleteManagePutCategory =  (req, res) => {
    res.render('');
}

//Tags
exports.getManageTags =  (req, res) => {
    res.render('');
}
