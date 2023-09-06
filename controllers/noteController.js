import asyncHandler from "../middleware/asyncHandler.js"
import Note from "../models/noteModels.js"

// Desc: Fetch all notes
// Route: /get/notes
const getNotes = asyncHandler(async (req, res) => {
	try {
		const userId = req.params.userId
		const notes = await Note.find({ userId: userId })
		res.json(notes)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

// Desc: Fetch notes by id
// Route: /get/notes/:id
const getNotesById = asyncHandler(async (req, res) => {
	try {
		const userId = req.params.userId
		const noteId = req.params.noteId

		if (!mongoose.Types.ObjectId.isValid(noteId)) {
			res.status(400).json({ message: "Invalid ObjectId format for noteId" })
			return
		}
		const note = await Note.findOne({ id: req.params.id, userId: userId })
		if (note) {
			return res.json(note)
		} else {
			res.status(404)
			throw new Error("Note not found")
		}
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

const createNote = asyncHandler(async (req, res) => {
	try {
		const { user, title, body } = req.body
		const newNote = new Note({
			user,
			title,
			body,
		})
		const savedNote = await newNote.save()
		res.status(201).json(savedNote)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

const deleteNote = asyncHandler(async (req, res) => {
	try {
		const noteId = req.params.id
		const note = await Note.findById(noteId)
		if (!note) {
			res.status(404)
			throw new Error("Note Not Found")
		}
		await note.remove()
		res.json({ message: "Note deleted successfully" })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

export { getNotes, getNotesById, createNote, deleteNote }
