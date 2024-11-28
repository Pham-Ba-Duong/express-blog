const PostModel = require("../models/post.model");

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

exports.postCreateComment = (req, res) => {
    try {
        const { content, user } = req.body;
        const newComment = PostModel.findOneAndUpdate({_id:req.body._id},{comment:{content:req.body.content,
             user:req.body.user.name,
         },
        })
     
        if(newComment) {
         res.status(201).json(newComment)
        }
    }catch(err) {
        console.log(err);
    }
  
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