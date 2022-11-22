const express=require('express')
const reg_controller=require('../../controller/register_controller')
const Router=express.Router()

Router.post('/',reg_controller.register_controll)



module.exports=Router
