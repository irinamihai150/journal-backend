import bcrypt from "bcrypt"

async function testBcrypt() {
	const plainPassword = "Ciuperca123!"
	const saltRounds = 10

	try {
		const hashedPassword = await bcrypt.hash(plainPassword, saltRounds)
		console.log("Hashed Password:", hashedPassword)

		const isMatch = await bcrypt.compare(plainPassword, hashedPassword)
		console.log("Password Match:", isMatch)
	} catch (error) {
		console.error("Bcrypt Error:", error)
	}
}

testBcrypt()
