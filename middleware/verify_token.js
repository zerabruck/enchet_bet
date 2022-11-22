
const jwt=require('jsonwebtoken')
const customer_model=require('../model/customer')

const verify_token=(req,res,next)=>{
    const token=req.headers.authorization || req.headers.Authorization
    console.log("hello")
    console.log(token)
    
    if(!token?.startsWith("Bearer ")) return res.sendStatus(401)

    const accesstoken=token.split(' ')[1]
    console.log('second hello')

    jwt.verify(accesstoken,process.env.ACCESS_TOKEN_SECRET,async(err,decode)=>{
        if(err){
            return res.status(401).json({"message":"autherization failed"})
        }

        req.body.username=decode.username
        next()
    })

}


module.exports=verify_token