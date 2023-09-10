import asyncHandler from "../middleware/asyncHandler.js"
import bcrypt from "bcrypt"
import User from "../models/userModel.js"
// import jwt from "jsonwebtoken"
import generateToken from "../utils/generateToken.js"

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

const authUser = asyncHandler(async (req, res, next) => {
	const { user, pwd } = req.body

	try {
		const foundUser = await User.findOne({ name: user })

		if (foundUser) {
			generateToken(res, user._id)
			console.log("Parola furnizată:", pwd)
			console.log("Parola stocată în baza de date:", foundUser.password)
			const cleanPassword = pwd.trim()
			console.log("Password received:", cleanPassword)

			const isPasswordValid = bcrypt.compare(cleanPassword, foundUser.password)
			// const isPasswordValid = await bcrypt.compare(pwd, foundUser.password)
			console.log("Rezultatul bcrypt.compare:", isPasswordValid)
			console.log("Password stored in the database:", foundUser.password)
			console.log("Password received:", pwd)

			if (isPasswordValid) {
				console.log("Authentication successful for user:", foundUser.name)
				generateToken(res, user._id)
				res.json({
					_id: foundUser._id,
					name: foundUser.name,
				})
			} else {
				console.log("Autentificare eșuată pentru utilizator:", foundUser.name)
				res.status(401).json({ error: "Nume sau parolă invalidă" })
			}
		} else {
			console.log("Utilizatorul nu a fost găsit:", user)
			res.status(401).json({ error: "Utilizatorul nu a fost găsit" })
		}
	} catch (error) {
		console.error("Eroare server:", error)
		res.status(500).json({ error: "Eroare server" })
	}
})

//register user
//POST/users
const registerUser = asyncHandler(async (req, res) => {
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
		const hashedPassword = await hashPassword(pwd)
		console.log("Hashed password:", hashedPassword)

		// Create a new User instance with the hashed password
		const newUser = new User({
			name: user,
			password: hashedPassword,
		})

		// Save the user to the database
		const savedUser = await newUser.save()
		console.log("User saved successfully:", savedUser)

		// Respond to the client that the user is registered
		res.json({ message: "User registered successfully!" })
	} catch (error) {
		console.error("Error during registration:", error)
		res.status(500).json({ message: "Internal server error!" })
	}
})

//logoutuse /clear cookie
//POST /users/logout
const logoutUser = asyncHandler(async (req, res) => {
	res.cookie("jwt", "", {
		httpOnly: true,
		expires: new Date(0),
	})

	res.status(200).json({ message: "Logged out successfully" })
})
//get user profile
// GET users/profile/
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)
	if (user) {
		res.status(200).json({
			_id: user._id,
			name: user.name,
		})
	} else {
		res.status(404)
		throw new Error("User not found")
	}
})

const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)
	if (user) {
		user.name = req.body.name || user.name

		if (req.body.password) {
			user.password = req.body.password
		}
		const updatedUser = await user.save()
		res.status(200).json({
			_id: updatedUser._id,
			name: updatedUser.name,
		})
	} else {
		res.status(404)
		throw new Error("User not found")
	}
})
export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile }
