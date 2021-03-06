const express=require('express');
const jwt = require("jsonwebtoken");
const User=require("../models/userSchema");
const router=express.Router();
//const router = require('../router/auth');


const authenticate= async(req,res,next)=>{
try{

const token = req.cookies.jwtoken;
const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token});
if(!rootUser){
    throw new Error('User not found')}
req.token=token;
req.rootUser=rootUser;
req.userID= rootUser._id;
next();


}catch(err){
    console.log("Error authenticate");
    res.status(401).send('Unauthorised: No token provided');
    console.log(err);

}
}
module.exports = authenticate;