const customer_model=require('../model/customer')

const logout=async(req,res)=>{
    const token=req.cookies

    if(!token?.jwt){
        return res.status(401).json({"message":"no cookies"})

    }
    const refreshtoken=token.jwt
    const result=await customer_model.findOne({refreshtoken}).exec()

    if(!result){
        res.clearCookie('jwt',refreshtoken,{httpOnly:true,samesite:'None',maxage:24*60*60*1000})
        // res.clearCookie('jwt',{httpOnly:true,sameSite:'None',secure:true,maxage:24*60*60*1000})
        res.status(404).json({"message":"something went wrong"})
    }
    result.refreshToken=''
    const output=await result.save()
    console.log(output)
    res.clearCookie('jwt',{httpOnly:true,samesite:'None',maxage:24*60*60*1000})
    res.sendStatus(204)

}


module.exports={logout}