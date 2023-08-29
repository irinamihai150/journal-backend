import mongoose from "mongoose"
import dotenv from "dotenv"
import users from "./data/users.js"
import notes from "./data/notes.js"
import User from "./models/userModel.js"
import Note from "./models/noteModels.js"
import connectDB from "./config/db.js"
dotenv.config()
connectDB()

const importData = async () => {
	try {
		await Note.deleteMany()
		await User.deleteMany()

		const createdUsers = await User.insertMany(users)
		const sampleNotes = notes.map((note) => {
			return { ...note, user: createdUsers[0]._id }
		})
		await Note.insertMany(sampleNotes)
		console.log("Data imported!")
		process.exit()
	} catch (error) {
		console.error(`Error: ${error.message}`)
		process.exit(1)
	}
}

const destroyData = async () => {
	try {
		await Note.deleteMany()
		await User.deleteMany()
		console.log("Data destroyed!")
		process.exit()
	} catch (error) {
		console.error(`Error: ${error.message}`)
		process.exit(1)
	}
}
// console.log(process.argv[2])

if (process.argv[2] === "-d") {
	destroyData()
} else {
	importData()
}
