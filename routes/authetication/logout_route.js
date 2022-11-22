
const express=require('express')
const Routher=express.Router()
const controller=require('../../controller/logout')

Routher.post('/',controller.logout)

module.exports=Routher