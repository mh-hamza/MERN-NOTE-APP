import express from 'express'
import Note from "../models/note.js"
//yaha middleware import karna hai
const router = express.Router()
import middleware from '../middleware/middleware.js'

router.post('/addNote', middleware, async (req, res) => {
  try {
    const { title, description } = req.body

    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Title and description are required." });
    }

    const newNote = new Note({
      title,
      description,
      userId: req.user.id
    })
    await newNote.save();
    return res.status(200).json({ success: true, message: "Note Created successfully" })
  } catch (error) {
    return res.status(400).json({ success: false, message: "Server error in Add note route" })
  }


})
router.delete('/:id', middleware, async (req, res) => {
  try {
    const { id } = req.params
    const deleteNote = await Note.findByIdAndDelete(id)
    return res.status(200).json({ success: true, message: "Note Delete successfully" })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error in deleting note" })
  }
})
router.put('/:id', middleware, async (req, res) => {
  try {
    const { id } = req.params
    const updateNote = await Note.findByIdAndUpdate(id, req.body)
    return res.status(200).json({ success: true, message: "Note Update successfully" })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ success: false, message: "note Update Error" })
  }
})
router.get('/', middleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id })
    return res.status(200).json({ success: true, notes, message: "Notes fetched successfully" })
  } catch (error) {
    return res.status(404).json({ success: false, message: "ERROR in Notes fetching" })
  }
})

export default router