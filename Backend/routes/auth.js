const express=require('express')
const User = require('../models/User')
const router=express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs')
var jwt=require('jsonwebtoken')
var fetchuser=require('../middlewares/fetchuser')
const JWT_SECRET='usamaisagoodb$oy'
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
    //adding salt to password and hashing it
    const salt=await bcrypt.genSalt(10)
    const secPass= await bcrypt.hash(req.body.password,salt)
    //creating user
     user = await User.create({
        name: req.body.name,
        password:secPass,
        email: req.body.email
      })
      const data={
        user:{
            id:user.id
        }
      }
      const authToken=jwt.sign(data,JWT_SECRET)
      res.json({authToken})
    //   res.json({message:"User Created!"})
    }
    catch(error)
    {
        console.error(error.message)
        res.status(500).send("Some error occured!")
    }
})


//LOGIN A USER USING : POST "/api/auth/login". login required
router.post('/login',[
    body('email','Enter a valid mail').isEmail(),
    // password must exist in database
    body('password',"Password can't be blank").exists()
], async(req,res)=>{
    try{
    ////If  there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body
    let user= await User.findOne({email})
    if(!user)
    {
        res.status(500).send({error:"Enter valid credentials!"})
    }
    const comparePass=await bcrypt.compare(password,user.password)
    if(!comparePass)
    {
        res.status(500).send({error:"Enter valid credentials!"})
    }
    const data={
        user:{
            id:user.id
        }
      }
      //creating an auth token to use in  any endpoint where user needs to login
      const authToken=jwt.sign(data,JWT_SECRET)
      res.json({authToken})
   }
    catch(error)
    {
        console.error(error.message)
        res.status(500).send("Some error occured!")
    }
})

//GET A USER USING : POST "/api/auth/getuser". login required
router.post('/getuser',fetchuser, async(req,res)=>{
    try {
    const userId=req.user.id
    const user=await User.findById(userId).select("-password")
    res.send({user})        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured!")
    }

})
module.exports=router