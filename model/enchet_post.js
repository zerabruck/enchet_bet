const mongoose=require('mongoose')
const Schema=mongoose.Schema

const enchet_post_schema= new Schema({
    information:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    customer_id:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model("enchetPost",enchet_post_schema)