const express = require('express')
const fetchuser = require('../middlewares/fetchuser')
const Notes = require('../models/Notes')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const { findOne, findByIdAndUpdate } = require('../models/Notes');
//ROUTE 1 FETCHING ALL NOTES OF USER: GET "/api/notes/fetchalldata". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)
})

//ROUTE 2 ADDING A NEW NOTE OF USER: POST "/api/notes/addnote". login required
router.post('/addnote', fetchuser, [
    body('title', 'Title must be atleast 5 characters').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(500).send("INTERNAL SERVER ERROR");
        }
        try {
            const { title, description, tag } = req.body
            const notes = new Notes({
                title, description, tag, user: req.user.id
            })
            const savedNote = await notes.save()
            res.json(savedNote)
        } catch (error) {
            return res.status(500).send("INTERNAL SERVER ERROR");
        }
    })


//ROUTE 3 UPDATING A EXISTING NOTE OF USER: GET "/api/notes/updatenote". login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body
        //adding a new note
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }
        //checking if the note exists
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("User Not Found!!!") }
        //checking if the user is same and authenticated
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!!")
        }
        //updating the note
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note)
    }
    catch (error) {
        return res.status(500).send("INTERNAL SERVER ERROR");
    }
})


//ROUTE 4 DELETING A EXISTING NOTE OF USER: DELETE "/api/notes/deletenote". login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //checking if the note exists
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("User Not Found!!!") }
        //checking if the user is same and authenticated
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!!")
        }
        //deleting the note
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted!", note: note })
    }
    catch (error) {
        return res.status(500).send("INTERNAL SERVER ERROR");
    }
})
module.exports = router