const cloudinary=require('cloudinary')

cloudinary.config({
    cloud_name:process.env.CLOUDNIARY_CLOUD_NAME,
    api_key:process.env.CLOUDNIARY_API_KEY,
    api_secret:process.env.CLOUDNIARY_API_SECRET

})


module.exports=cloudinary