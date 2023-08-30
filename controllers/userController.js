import User from "../models/userModel"

const authUser = async (req, res) => {
	res.send("auth user")
}

const registerUser = async (req, res) => {
	res.send("user registered")
}


const logoutUser = async (req, res) => {
	res.send("logout user")
}
export {authUser, registerUser, logoutUser}