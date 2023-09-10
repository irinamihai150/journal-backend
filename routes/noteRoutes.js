import express from "express"
import mongoose from "mongoose"

import {
	getNotes,
	getNotesById,
	createNote,
	deleteNote,
} from "../controllers/noteController.js"

const router = express.Router()
// Route to fetch all notes
router.get("/notes/user/:userId", getNotes)
router.post("/notes", createNote)
router.delete("/notes/user/:userId/:noteId", deleteNote)
// Route to fetch a note by ID
router.get("/notes/:id", getNotesById)
export default router
