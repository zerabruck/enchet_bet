const customer_model=require("../model/customer")
const bcrypt=require("bcrypt")

const register_controll=async(req,res)=>{

    if(!req.body.username || !req.body.password||!req.body.email ){
    return res.json({"message":"please enter all the required forms to finish registeration"}).status(400)
    }

    const username=req.body.username
    const duplicate=await customer_model.findOne({username:username}).exec()
    if(duplicate){
        return res.status(409).json({"message":"sorry username already taken"})
    }
    console.log("hi")
    try{
        const password=await bcrypt.hash(req.body.password,10)
     const email=req.body.email

    const result=await customer_model.create({
        username:username,
        password:password,
        email:email
    }    
        
    )
    res.status(201).json({"message":`${result}`})
    const second_result=await customer_model.find()
    console.log(second_result)
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message":err.message})
    }




}

module.exports={register_controll};