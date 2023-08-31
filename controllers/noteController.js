import asyncHandler from "../middleware/asyncHandler.js"
import Note from "../models/noteModels.js"

// Desc: Fetch all notes
// Route: /get/notes
const getNotes = asyncHandler(async (req, res) => {
	const notes = await Note.find({})
	res.json(notes)
})

// Desc: Fetch notes by id
// Route: /get/notes/:id
const getNotesById = asyncHandler(async (req, res) => {
	const note = await Note.findById(req.params.id)
	if (note) {
		return res.json(note)
	} else {
		res.status(404)
		throw new Error("Resource not found")
	}
})

export { getNotes, getNotesById }
