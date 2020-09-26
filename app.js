require('dotenv').config();
const app = require('express')();
const Admin = require('./models/admin'); 
const express = require('express');
const path = require('path'); 
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');
const session = require('express-session');
const sequelize = require('./util/database');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

app.set('view engine','ejs');

app.use(session({
    secret: process.env.SECRET_SESSION,
    store: new SequelizeStore({
        db: sequelize
    }),
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
        maxAge: new Date(Date.now()+ 7200000) // 2 hours
    }
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next)=>{
    if(!req.session.user)
    {
        return next();
    }
    Admin.findOne({where:{id: req.session.admin.id}})
    .then(admin=>{
        req.admin = admin;
        next();
    }).catch(err=>{
        console.log(err);
    })
})

app.use('/',userRoute);

app.use('/admin',adminRoute);

sequelize.sync()
.then(()=>{
    app.listen(3000);
})
