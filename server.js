dotenv.config()
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import User from "./models/userModel.js"
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bcrypt from "bcrypt"

connectDB() //connect to the database

const app = express()
app.use(express.json())

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

		const plainPwd = "mySecurePassword123"
		const saltRounds = 10

		// Hash the plain password
		const hash = await bcrypt.hash(plainPwd, saltRounds) // Use await here

		// Create a new User instance with the hashed password
		const newUser = new User({
			name:user,
			password:hash,
		})

		// Save the user to the database
		await newUser.save({ timeoutMs: 30000 }) // Use await here

		console.log("User saved successfully")
		// Respond to the client that the user is registered
		res.json({ message: "User registered successfully!" })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Internal server error!" })
	}
})

app.post("./auth", (req, res) => {
	const { user, pwd } = req.body
	if (user === "user" && pwd === "pwd") {
		res.status(200).json({ message: "Authentication successful" })
	} else {
		res.status(403).json({ message: "Authentication failed" })
	}
})
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})

export default app
