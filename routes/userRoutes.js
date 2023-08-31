import express from "express"
import {
	authUser,
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
} from "../controllers/userController"

router.route("/").post(registerUser).get(getUsers)
router.post("/logout", logoutUser)
router.post("/login", authUser)
router.route("/profile").get(getUserProfile).put(updateUserProfile)
export default router
