module.exports.getAdminSite = (req,res,next)=>{
    res.render('admin',{
        path: ''
    });
};

module.exports.loginAdmin = (req,res,next)=>{
    console.log(req.body.password);
};