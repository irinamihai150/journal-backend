import {
	authUser,
	registerUser,
	logoutUser,
} from "../controllers/userController"

router.route("/").post(registerUser).get(getUser)
router.post("/logout", logoutUser)
router.post("/login", authUser)
export default router
