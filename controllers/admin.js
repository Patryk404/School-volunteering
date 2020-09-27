require('dotenv').config();
const Admin = require('../models/admin');
const Post = require('../models/post');
const bcrypt = require('bcrypt');

module.exports.getAdminSite = (req,res,next)=>{
    res.render('admin',{
        path: '',
        isLoggedIn: req.session.isLoggedIn
    });
};

module.exports.getAdminNewPost = (req,res,next)=>{
    res.render('new_post',{ 
        path: '',
        isLoggedIn: req.session.isLoggedIn
    })
}

module.exports.loginAdmin = async (req,res,next)=>{
    const password = req.body.password;
    const admin = await Admin.findOne({where: {id: 1}});
    const password_true = await bcrypt.compare(password,admin.password);
    if(password_true){
        req.session.isLoggedIn = true;
        req.session.admin = admin;
        try {
        await req.session.save(()=>{
            return res.redirect('/');
        })
        }
    catch(err) {
        console.log(err);
    }
    }
    else {
        return res.redirect('/');
    }
};

module.exports.createAdmin = async (req,res,next)=>{
    const password = await bcrypt.hash(req.body.password,12);
    const admin = await Admin.create({
        password: password
    });
    await admin.save();
    res.status(201).json({
        admin: admin
    });
};

module.exports.addNewPost = async(req,res,next)=>{
    const post = await new Post ({...req.body});
    await post.save();
    res.redirect('/');
};

module.exports.logoutAdmin = async(req,res,next)=>{
    req.session.destroy(err=>{
        console.log(err);
        res.redirect('/');
    })
};

module.exports.deletePost = async(req,res,next)=>{
    const id = req.params.id
    const post = await Post.findOne({where: {id: id}});
    try {
    await post.destroy();
    }
    catch(err){
        console.log(err);
    }
    res.redirect('/');
};

module.exports.editPost = async(req,res,next)=>{
    const id = req.params.id;
    const post = await Post.findOne({where: {id: id}});
    post.topic = req.body.topic;
    post.description = req.body.description;
    post.author = req.body.author;
    await post.save();
    res.redirect('/');
}

module.exports.getEditPost = async(req,res,next)=>{
    const id = req.params.id
    const post = await Post.findOne({where: {id:id}});
    res.render('edit_post',{
        post: post,
        path: '/',
        isLoggedIn: req.session.isLoggedIn
    });
}