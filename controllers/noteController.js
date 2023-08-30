 import asyncHandler from "../middleware/asyncHandler.js"
import Note from "../models/noteModels.js"

//desc fetch all notes
//route /get/notes
const getNotes = asyncHandler(async(req,res)=> {
const notes = await notes.find({

})
res.json(notes)

//desc fetch notes by id
//route /get/notes/:id

const getNotesById = asyncHandler(async(req,res)=> {
const note = await Note.findById(req.params.id)
		if (note) {
			return res.json(note)
		} else {
			res.status(404)
			throw new Error("Resource not found")
		}
}
})