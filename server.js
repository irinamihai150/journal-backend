import dotenv from "dotenv"
dotenv.config()

import connectDB from "./config/db.js"

import User from "./models/userModel.js"
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import notes from "./data/notes.js"
import Note from "./models/noteModels.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import noteRoutes from "./routes/noteRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import { authUser } from "./controllers/userController.js"

connectDB() //connect to the database
const app = express()
//body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true, // Allow credentials (cookies)
}

app.use(cors(corsOptions))
const PORT = process.env.PORT || 3500

const isValidEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(email)
}

app.get("/", (req, res) => {
	res.send("Hello, Express Server!")
})

app.get("/notes", async (req, res) => {
	try {
		const notes = await Note.find()
		res.json(notes)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal Server Error" })
	}
})
app.get("/notes/:id", async (req, res) => {
	try {
		const note = await Note.findById(req.params.id)
		if (!note) {
			res.status(404).json({ error: "Note not found" })
		} else {
			res.json(note)
		}
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal Server Error" })
	}
})
const hashPassword = async (plainPwd) => {
	const saltRounds = 10
	try {
		const hash = await bcrypt.hash(plainPwd, saltRounds)
		return hash
	} catch (err) {
		console.log(err)
		throw new Error("Password hashing failed")
	}
}

app.post("/register", async (req, res) => {
	// Use async function
	console.log("Received request body:", req.body)
	try {
		const { user, pwd } = req.body

		if (!user || !pwd) {
			res.status(400).json({
				message: "Username and password are required fields!",
			})
			return
		}

		// Hash the plain password
		const hashedPasswords = await hashPassword(pwd) // Use await here

		// Create a new User instance with the hashed password
		const newUser = new User({
			name: user,
			password: hashedPasswords,
		})

		// Save the user to the database
		await newUser.save()

		console.log("User saved successfully")
		// Respond to the client that the user is registered
		res.json({ message: "User registered successfully!" })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Internal server error!" })
	}
})
app.post("/auth", authUser)
app.use("/notes", noteRoutes)
app.post("/notes", noteRoutes)
app.delete("/notes", noteRoutes)
app.use("/users", userRoutes)
app.use(notFound)
app.use(errorHandler)
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})

export default app
