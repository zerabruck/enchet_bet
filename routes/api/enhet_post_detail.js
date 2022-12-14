const express=require('express')
const router=express.Router()
const verify_roles=require('../../middleware/verify_roles')
const roles=require('../../config/Roles')

const upload=require('../../config/multer')
// const multer=require('multer')


// const storage=multer.diskStorage({
//      destination:(req,file,callback)=>{
//           callback(null,'../../public/upload')
//      },
//      filename:(req,file,callback)=>{
//           callback(null,file.originalname)

//      }
     
// })

// const upload=multer({storage:storage})

const post_controler=require('../../controller/post_controller')

router.route('/')
        .get(post_controler.getallpost)
     // .get(verify_roles(roles.admin),post_controler.getallpost)

     .post(upload.single("photo"),post_controler.createpost)

     .put(upload.single("photo"),post_controler.updatepost)
     
     .delete(post_controler.deletepost)

router.route('/single').get(post_controler.getpost)


module.exports=router