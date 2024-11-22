exports.getAllComment = (req, res) => {
    res.render('comment');
}

exports.getCommentById = (req, res) => {
    const { id } = req.params;
    console.log(id);
}

exports.createComment = () => {
    console.log('Get Create Comment')
}

exports.postCreateComment = () => {
    console.log('Post Create comment')
}

exports.updateComment = (req, res) => {
    console.log('Update comment')
}

exports.postUpdateComment = (req, res) => {
    console.log('Update comment')
}

exports.deleteComment = (req, res) => {
    console.log('Delete comment')
}

exports.postDeleteComment = (req, res) => {
    console.log('Update comment')
}