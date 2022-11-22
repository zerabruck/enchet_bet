const express=require('express')
const Router=express.Router()
const contorller=require("../../controller/login_controller")

Router.post('/',contorller.login_contoller)

module.exports=Router