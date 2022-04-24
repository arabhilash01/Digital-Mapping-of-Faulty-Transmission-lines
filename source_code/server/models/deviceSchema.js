const mongoose=require('mongoose');

const userDevice=new mongoose.Schema({
    deviceid:{
        type:String,
        required:true
    },
    place:{
        type:String,
        required:true
    },
    lat:{
        type:String,
        required:true
    },
    lng:{
        type:String,
        required:true
    },
   

})
const Dev =mongoose.model('Device',userDevice);
module.exports=Dev;