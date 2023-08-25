// Import the 'express' module using CommonJS syntax
import express from "express"
const app = express()
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
	const formData = req.body
	if (!formData.username || !formData.email || !formData.password) {
		res.status(400).json({ message: "All fields are required!" })
		return
	}
	if (!isValidEmail(formData.email)) {
		res.status(400).json({ message: "Invalid email address!" })
	}
	res.json({ message: "User registered successfully!", data: formData })
})
