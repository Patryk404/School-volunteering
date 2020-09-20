module.exports.getIndex = (req,res,next)=>{
    res.render('index',{
        path:'/'
    })
};

module.exports.getAboutUs = (req,res,next)=>{
    res.render('about_us',{
        path: '/about_us'
    });
}