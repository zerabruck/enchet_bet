const express=require('express')
const router=express.Router()
const verify_roles=require('../../middleware/verify_roles')
const roles=require('../../config/Roles')

const post_controler=require('../../controller/post_controller')

router.route('/')
     .get(verify_roles(roles.admin),post_controler.getallpost)

     .post(post_controler.createpost)

     .put(post_controler.updatepost)
     
     .delete(post_controler.deletepost)

router.route('/single').get(post_controler.getpost)


module.exports=router