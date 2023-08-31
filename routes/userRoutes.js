import express from "express"
const router = express.Router()

import {
	authUser,
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
} from "../controllers/userController.js"

router.route("/").post(registerUser)
router.post("/logout", logoutUser)
router.post("/login", authUser)
router.route("/profile").get(getUserProfile).put(updateUserProfile)
export default router
