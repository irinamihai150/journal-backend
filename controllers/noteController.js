import asyncHandler from "../middleware/asyncHandler.js"
import Note from "../models/noteModels.js"
import mongoose from "mongoose"

const getNotes = asyncHandler(async (req, res) => {
	
	  try {
			const userId = req.params.userId
			console.log("Received userId:", userId)
			const notes = await Note.find({ user:userId })
			console.log("Notes found:", notes) 
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
		const note = await Note.findOne({ _id: req.params.id, userId: userId })
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
		const userId = req.params.userId
		const noteId = req.params.noteId
		console.log("Deleting note with ID:", noteId)

		if (!mongoose.Types.ObjectId.isValid(noteId)) {
			console.error("Invalid ObjectId format for noteId:", noteId)
			res.status(400).json({ message: "Invalid ObjectId format for noteId" })
			return
		}

		const result = await Note.deleteOne({ _id: noteId, user: userId })
		console.log("Delete result:", result)

		if (result.deletedCount === 1) {
			console.log("Note deleted successfully.")
			res.json({ message: "Note deleted successfully" })
		} else {
			console.error("Note not found for ID:", noteId)
			res.status(404).json({ message: "Note not found" })
		}
	} catch (error) {
		console.error("Error while deleting note:", error)
		res.status(500).json({ message: error.message })
	}
})

export { getNotes, getNotesById, createNote, deleteNote }
