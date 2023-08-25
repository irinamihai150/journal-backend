// Import the 'express' module using CommonJS syntax
import express from "express"
import cors from "cors"
const app = express()
app.use(express.json())

const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true, // Allow credentials (cookies)
}

app.use(cors(corsOptions))
const PORT = process.env.PORT || 3500

const isValidEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(email)
}
app.get("/", (req, res) => {
	res.send("Hello, Express Server!")
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
app.post("/register", (req, res) => {
	console.log("Received request body:", req.body)
	try {
		const { user, email, pwd, matchPwd } = req.body

		if (!user || !email || !pwd || !matchPwd) {
			res.status(400).json({
				message:
					"Username, email, and password are required fields are required!",
			})
			return
		}
		if (pwd !== matchPwd) {
			res
				.status(400)
				.json({ message: "Password and Confirm Password do not match!" })
			return
		}
		if (!isValidEmail(email)) {
			res.status(400).json({ message: "Please provide a valid email address!" })
			return
		}

		res.json({ message: "User registered successfully!", data: req.body })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Internal server error!" })
	}
})
