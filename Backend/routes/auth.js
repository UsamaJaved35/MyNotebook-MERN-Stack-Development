const express=require('express')
const User = require('../models/User')
const router=express.Router()
const { body, validationResult } = require('express-validator');
//CREATE A USER USING : POST "/api/auth/createuser".No login required
router.post('/createuser',[
    body('email','Enter a valid mail').isEmail(),
    // password must be at least 5 chars long
    body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
    body('name','Name must be atleast 3 characters').isLength({ min: 3})
], async(req,res)=>{
    ////If  there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        //check whether the user with the same email exists
    let user=await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({ error:"Sorry a user with the same email already exists!" });
    }
     user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
      })
      res.json({message:"User Created!"})
    }
    catch
    {
        console.error(error.message)
        res.status(500).send("Some error occured!")
    }
})
module.exports=router