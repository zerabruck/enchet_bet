const express=require('express')
const Routher=express.Router()
const controller=require('../controller/refresh_token_controller')

Routher.post('/',controller.refresh_token)

module.exports=Routher