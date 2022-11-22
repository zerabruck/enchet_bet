const customer_model=require('../model/customer')

const verify_role=(role)=>{
    return async(req,res,next)=>{
        const user=await customer_model.findOne({username:req.body.username})

        if(!user){
            return res.status(401).json({'message':"no user found "})
        }
        // console.log(role)
        // console.log(user.role)

        if(role===user.role.User){
            next()
        }
        else{
            return res.status(401).json({"message":"not allowed to use this funciton"})
        }


    }
}

module.exports=verify_role