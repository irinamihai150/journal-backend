import express from " express"
import { getNotes, getNotesById } from "controllers/noteController.js"

const router = express.Router()
// Route to fetch all notes
router.get("/get/notes", getNotes)

// Route to fetch a note by ID
router.get("/get/notes/:id", getNotesById)
export default router
