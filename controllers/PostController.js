exports.getAllPost = (req, res) => {
    res.render('Post');
}

exports.getPostById = (req, res) => {
    const { id } = req.params;
    console.log(id);
}

exports.createPost = () => {
    console.log('Get Create Post')
}

exports.postCreatePost = () => {
    console.log('Post Create Post')
}

exports.updatePost = (req, res) => {
    console.log('Update Post')
}

exports.postUpdatePost = (req, res) => {
    console.log('Update Post')
}

exports.deletePost = (req, res) => {
    console.log('Delete Post')
}

exports.postDeletePost = (req, res) => {
    console.log('Update Post')
}