const dotenv= require('dotenv');
const mongoose=require('mongoose');
const express=require('express');
const cookieParser = require('cookie-parser');
const app= express();
app.use(cookieParser());
dotenv.config({path:'./config.env'});
require('./db/conn');
app.use(express.json());
app.use(require('./router/auth.js'));




const DB=process.env.DATABASE;
const PORT=process.env.PORT;

//const User =require('./model/userSchema');
// mongoose.connect(DB).then(()=>{
//     console.log("connection success");
// }).catch((err)=>console.log('no connection'));

// app .get('/about',(req,res)=>{
//     res.send('about');
//     });
app .get('/signin',(req,res)=>{
    res.send('signin');
    });
app .get('/signup',(req,res)=>{
    res.send('signup');
    });
    
console.log('Hello from server');
app.listen(PORT,()=>{
    console.log(`server run at port ${PORT}`);
})