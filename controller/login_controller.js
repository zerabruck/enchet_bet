const bcrypt=require('bcrypt')
const customer_model=require('../model/customer')
const jwt=require('jsonwebtoken')

const login_contoller=async(req,res)=>{
    const body=req.body
    if(!body.username || !body.password){
        return res.status(401).json({"message":" username and password are required to login"})
    }

    const user=await customer_model.findOne({username:body.username}).exec()
    if(!user){
        return res.status(401).json({"message":"loginfailed"})
    }


    const match=await bcrypt.compare(body.password,user.password)
    if(!match){
        return res.status(401).json({"message":"log in failed"})
    }

    try{
        const accesstoken=jwt.sign({"username":user.username},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'60s'})

    const refreshtoken=jwt.sign({"username":user.username},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'1d'})

    user.refreshToken=refreshtoken
    const result=await user.save()

    console.log(result)

    //don't forget to make secure:true for the third input in the cookie

    res.cookie('jwt',refreshtoken,{httpOnly:true,samesite:'None',maxage:24*60*60*1000})

    res.json({"accesstoken":accesstoken,"role":user.role.User})

    }
    catch(err){
        res.status(401).json({"message":err.message})
    }



}

module.exports={login_contoller}