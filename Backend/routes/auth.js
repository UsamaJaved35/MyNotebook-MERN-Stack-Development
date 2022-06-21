const express=require('express')
const User = require('../models/User')
const router=express.Router()
//CREATE A USER USING : POST "/api/auth". Doesn't require auth
router.get('/',(req,res)=>{
    console.log(req.body)
    const user=User(req.body)
    user.save()
    //res.json([])
    res.send("hello")
})
module.exports=router