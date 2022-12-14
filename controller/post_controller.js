const enchetPost=require('../model/enchet_post');
const cloudinary=require('../config/cloudinary')

const getallpost=async(req,res)=>{
    const posts=await enchetPost.find()
    if(!posts) res.status(401).json({"message":"there are no post currently"})

    res.json(posts)

}
//information name address contact label price avatar cloudinary_id customer_id
const createpost=async(req,res)=>{
    const body=req.body

    console.log(body)
    if(!body||!body?.information|| !body?.price||!req?.file?.path ||!body?.customer_id||!body?.address||!body?.name||!body?.contact||!body?.address ){
        console.log(body)
        res.status(404).json({"message":"additional information about the post is required"})
    }

    try{
        const result=await cloudinary.uploader.upload(req.file.path)
        const resultt=await enchetPost.create({
            information:body.information,
            price:body.price,
            name:body.name,
            address:body.address,
            label:body.label,
            contact:body.contact,
            customer_id:body.customer_id,
            avatar:result.secure_url,
            cloudinary_id:result.public_id
        })
    
        res.status(200).json(resultt)

    }catch(err){
        console.log(err)
    }

}

const updatepost=async(req,res)=>{
    const body=req.body
    console.log(body)
    if(!body||!body.id) {
        res.status(404).json({"message":"id is required to update post"})
    }

    const result=await enchetPost.findOne({_id:body.id}).exec()
    if(!result){
        res.status(404).json({'message':"no post was made by the id"})
    }

    if(req?.file?.path){
        await cloudinary.uploader.destroy(result.cloudinary_id)
        const photo_result=await cloudinary.uploader.upload(req.file.path)
    const avatar=photo_result.secure_url 
    const cloudinary_id=photo_result.public_id


    result.avatar=avatar
    result.cloudinary_id=cloudinary_id


    }
    

    result.information=req.body.information||result.information
    result.price=req.body.price || result.price
    result.name=req.body.name || result.name
    result.address=req.body.address || result.address
    result.contact=req.body.contact || result.contact
    result.label=req.body.label || result.label 
    const saved=await result.save()

    res.status(200).json(saved)

}

const getpost=async(req,res)=>{
    if(!req?.body?.id){
        res.status(404).json({"message":"id is required"})
    }

    const result=await enchetPost.findOne({_id:req.body.id}).exec()

    if(!result){
        res.status(404).json({"message":`there was no post by the id: ${req.body.id}`})
    }

    res.status(200).json(result)
}


const deletepost=async(req,res)=>{
    if(!req?.body?.id){
        res.status(404).json({"message":"id is required"})
    }

    try{
        const user=await enchetPost.findById({_id:req.body.id})
        if(!user){
            res.status(404).json({"message":`there was no post by the id: ${req.body.id}`})
        }

    await cloudinary.uploader.destroy(user.cloudinary_id)
    await user.remove()
    res.status(200).json(user)
    }catch(e){
        console.log(e)
    }
    
}

module.exports={getallpost,createpost,deletepost,updatepost,getpost}

