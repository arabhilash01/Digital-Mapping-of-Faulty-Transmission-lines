const express= require('express');
const jwt =require('jsonwebtoken');
const router=express.Router();
const bcrypt = require('bcryptjs');
require('../db/conn');

const User=require("../models/userSchema");
const Dev =require("../models/deviceSchema");
const authenticate =require("../middleware/authenticate");
router.get('/',(req, res) => {
    res.send('hello router.js');
});
router.post('/register',async (req, res)=>{
    const{name,email,phone,password,cpassword}=req.body;
 if(!name || !email || !phone || !password || !cpassword)
 {
    return res.status(422).json({error:"plz fill all details"});
 }
//res.json({message:req.body});
//res.send('my reg page');
try{
 const userExist=await Dev.findOne({email:email});
 if(userExist){
    return res.status(422).json({error:"email already exists"});
 }else if(password != cpassword){
   return res.status(422).json({error:"Password does not match"});
 }else{
   const user=new User({name,email,phone,password,cpassword});


   await user.save();
   
   res.status(201).json({message:"user reg successful"});
   
   }
 
 
 

     
     
 
}catch(err){
    console.log(err);
}
});

//login route

router.post('/signin',async (req,res)=>{

try{
const{email,password}=req.body;
if(!email || !password){
   return res.status(400).json({error:"Please fill all fields"})
}
const userLogin = await User.findOne({email: email});
if(userLogin){
   const isMatch= await bcrypt.compare(password,userLogin.password);

   const token = await userLogin.generateAuthToken();
   console.log(token);
   res.cookie("jwtoken",token,{
      expires:new Date(Date.now()+25892000000),
      httpOnly:true
   });

   if(!isMatch){
      res.status(400).json({error:"Invalid credentials"});
   }
   else{
      res.json({message:"user signin successful"});
   }
   }else{
      res.status(400).json({error:"user signin unsuccessful"});
   }
//console.log(userLogin);


}catch(err){
console.log(err);
}



})

router.post('/devreg',async (req, res)=>{
   const{deviceid,place,lat,lng}=req.body;
if(!deviceid || !place|| !lat|| !lng)
{
   return res.status(422).json({error:"plz fill all details"});
}

// res.json({message:req.body});
//res.send('my reg page');
try{
const devExist=await Dev.findOne({deviceid: deviceid});
if(devExist){
   return res.status(422).json({error:"deviceid already exists"});
}
else{
  const device=new Dev({deviceid,place,lat,lng});


  await device.save();
  
  res.status(201).json({message:"device reg successful"});
  
  }




    
    

}catch(err){
   console.log(err);
}
});
router.get('/about',authenticate,(req,res)=>{
  // console.log("Hello about us");
   res.send(req.rootUser);
   });

router.get('/logout',authenticate,(req,res)=>{
      console.log("Hello Logout");
      res.clearCookie('jwtoken',{path:'/'});
       res.status(200).send(req.rootUser);
       });

module.exports=router;