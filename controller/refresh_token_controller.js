const jwt=require('jsonwebtoken')
const customer_model=require("../model/customer")
const refresh_token=async(req,res)=>{
    const token=req.cookies
    // const cookies=req.cookies;
    // console.log(token.jwt)
    if(!token?.jwt){
        return res.status(404).json({"message":"there is no cookie"})
    }
    // console.log(token.jwt)
    const refresh_token=token.jwt

    const user=await customer_model.findOne({refresh_token}).exec()

    if(!user){
        return res.status(404).json({"message":"there is no user by that token"})
    }

    jwt.verify(refresh_token,process.env.REFRESH_TOKEN_SECRET,
    (err,decode)=>{
        if(err){
            return res.status(401).json({"message":err.message})
        }

        // const result=await customer_model.findOne({username:decode.username}).exec()


        const accesstoken=jwt.sign({"username":decode.username},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'60s'})
        res.status(201).json({"accesstoken":accesstoken})
    })


}

module.exports={refresh_token}