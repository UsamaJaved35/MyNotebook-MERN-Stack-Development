const express=require('express')
const fetchuser = require('../middlewares/fetchuser')
const Notes = require('../models/Notes')
const router=express.Router()
const { body, validationResult } = require('express-validator');
//ROUTE 1 FETCHING ALL NOTES OF USER: GET "/api/notes/fetchalldata". login required
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    const notes= await Notes.find({user:req.user.id})
    res.json(notes)
})

//ROUTE 2 ADDING A NEW NOTE OF USER: POST "/api/notes/addnote". login required
router.post('/addnote',fetchuser,[
    body('title','Title must be atleast 5 characters').isLength({ min: 3 }),
    body('description','Description must be atleast 5 characters').isLength({ min: 5 })]
    ,async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).send("INTERNAL SERVER ERROR");
    }
    try {
        const{title,description,tag}=req.body
        const notes=new Notes({
            title,description,tag,user:req.user.id
        })
        const savedNote=await notes.save()
        res.json(savedNote)
    } catch (error) {
        return res.status(500).send("INTERNAL SERVER ERROR");
    }
})
module.exports=router