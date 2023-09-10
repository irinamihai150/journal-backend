import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"

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
import { authUser, registerUser } from "./controllers/userController.js"

connectDB() //connect to the database
const app = express()
//body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//cookie parser middleware
app.use(cookieParser())

const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true, // Allow credentials (cookies)
}

app.use(cors(corsOptions))
const PORT = process.env.PORT || 3500

// const isValidEmail = (email) => {
// 	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// 	return emailRegex.test(email)
// }

app.get("/", (req, res) => {
	res.send("Hello, Express Server!")
})

app.post("/auth", authUser)
app.post("/register", registerUser)
app.post("/notes", noteRoutes)
app.delete("/notes", noteRoutes)
app.use(noteRoutes)
app.use("/users", userRoutes)
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})

export default app
