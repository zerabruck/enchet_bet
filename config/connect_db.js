const mongoose=require('mongoose')

const connect_db=async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })

    }catch(err){
      
        console.log(err)
    }



}

module.exports=connect_db