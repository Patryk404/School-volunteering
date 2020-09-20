const app = require('express')();
const express = require('express');
const path = require('path'); 
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/',userRoute);


app.listen('3000',()=>{
    console.log('listening on port 3000');
})
