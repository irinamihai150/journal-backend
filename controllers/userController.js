import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/userModel.js"
//auth user & get token
//GET/ users
const authUser = asyncHandler(async (req, res) => {
	const { name, password } = req.body
	const user = await User.findOne({ name })
	if (!user) {
		res.status(401).json({ message: "Authentication failed" })
		return
	}
	const isPasswordValid = await bcrypt.compare(password, user.password)
	if (isPasswordValid) {
		res.status(200).json({ message: "Authentication successful" })
	}else {
		res.status(401).json({ message: "Authentication failed" })
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
