const mongoose=require('mongoose')
const Schema=mongoose.Schema

const customer=new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    refreshToken:String,
    role:{
        User:{
            type:String,
            default:"USER"
        },
        Editor:String,
        Admin:String
    }


})

module.exports=mongoose.model('Customer',customer)