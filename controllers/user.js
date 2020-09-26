const Post = require('../models/post');

module.exports.getIndex = async(req,res,next)=>{
    const posts = await Post.findAll({order: [['createdAt', 'DESC']]});
    res.render('index',{
        path:'/',
        posts: posts,
        isLoggedIn: req.session.isLoggedIn
    });
};

module.exports.getAboutUs = (req,res,next)=>{
    res.render('about_us',{
        path: '/about_us'
    });
}

module.exports.getPost= async (req,res,next)=>{
    const post = await Post.findOne({where: {id: req.params.id}});
    post.description = post.description.split('\n');
    res.render('exact_post',{
        post: post,
        path: '/'
    })
}