import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/userModel.js"
//auth user & get token
//GET/ users
const authUser = asyncHandler(async (req, res) => {
	res.send("auth user")
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
