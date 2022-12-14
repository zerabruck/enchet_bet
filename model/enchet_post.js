const mongoose=require('mongoose')
const Schema=mongoose.Schema
const enchet_post_schema= new Schema({
    information:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    label:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    },
    cloudinary_id:{
        type:String,
        required:true
    },
    customer_id:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("enchetPost",enchet_post_schema)