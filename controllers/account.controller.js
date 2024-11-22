const PostModel = require('../models/post.model')

exports.getAccount =  (req, res) => {
    const data = PostModel.find() || [];
    // context
    res.render('../views/account.page.ejs', { data})
}