const enchetPost=require('../model/enchet_post');


const getallpost=async(req,res)=>{
    const posts=await enchetPost.find()
    if(!posts) res.status(401).json({"message":"there are no post currently"})

    res.json(posts)

}

const createpost=async(req,res)=>{
    const body=req.body
    if(!body||!body?.information|| !body?.price||!body?.photo ||!body?.customer_id ){
        res.status(401).json({"message":"additional information about the post is required"})
    }

    try{
        const result=await enchetPost.create({
            information:body.information,
            price:body.price,
            customer_id:body.customer_id,
            photo:body.photo
        })
    
        res.status(200).json(result)

    }catch(err){
        console.log(err)
    }

}

const updatepost=async(req,res)=>{
    const body=req.body
    if(!body||!body.id) {
        res.status(404).json({"message":"id is required to update post"})
    }

    const result=await enchetPost.findOne({_id:body.id}).exec()
    if(!result){
        res.status(404).json({'message':"no post was made by the id"})
    }


    const information=req.body.information||result.information
    const price=req.body.price || result.price
    const photo=req.body.photo || result.photo
    result.information=information
    result.price=price
    result.photo=photo


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

    const result=await enchetPost.deleteOne({_id:req.body.id})

    if(!result){
        res.status(404).json({"message":`there was no post by the id: ${req.body.id}`})
    }

    res.status(200).json(result)
    
}

module.exports={getallpost,createpost,deletepost,updatepost,getpost}

