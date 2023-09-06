import asyncHandler from "../middleware/asyncHandler.js"
import bcrypt from "bcrypt"
import User from "../models/userModel.js"
//auth user & get token
//GET/ users

const authUser = asyncHandler(async (req, res, next) => {
	const { user, pwd } = req.body

	try {
		const foundUser = await User.findOne({ name: user })

		if (!foundUser) {
			return res.status(401).json({ message: "Invalid name" })
		}

		// const isPasswordValid = await bcrypt.compare(pwd, foundUser.password)
		
		const isPasswordValid = true
		console.log(pwd)
		console.log(foundUser.password)
		console.log(isPasswordValid)

		if (isPasswordValid) {
			console.log("Authentication successful for user:", foundUser.name)
			return res.status(200).json({ message: "Authentication successful" })
		} else {
			console.log("Authentication failed for user:", foundUser.name)
			return res.status(401).json({ message: "Authentication failed" })
		}
	} catch (error) {
		console.error("Error during authentication:", error)
		return next(error) // Pass the error to the error handling middleware
	}
})

//register user
//POST/users
const registerUser = asyncHandler(async (req, res) => {
	res.send("user registered")
})
//logoutuse /clear cookie
//POST /users/logout
const logoutUser = asyncHandler(async (req, res) => {
	res.send("logout user")
})
//get user profile
// GET users/profile/
const getUserProfile = asyncHandler(async (req, res) => {
	res.send(" get user profile")
})

const updateUserProfile = asyncHandler(async (req, res) => {
	res.send("update user profile")
})
export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile }
