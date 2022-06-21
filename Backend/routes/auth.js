const express=require('express')
const User = require('../models/User')
const router=express.Router()
const { body, validationResult } = require('express-validator');
//CREATE A USER USING : POST "/api/auth". Doesn't require auth
router.post('/',[
    body('email','Enter a valid mail').isEmail(),
    // password must be at least 5 chars long
    body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
    body('name','Name must be atleast 3 characters').isLength({ min: 3})
],(req,res)=>{
    //console.log(req.body)
    //const user=User(req.body)
    //user.save()
    //res.json([])
    //res.send("hello")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //res.send(req.body)
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
      }).then(user => res.json(user))
      .catch(err=>{console.log('errror')
      res.json({ message:"Please Enter a unique value of mail"})
    }
      )
    })
module.exports=router