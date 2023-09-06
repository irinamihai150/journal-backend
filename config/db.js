import mongoose from "mongoose"

const connectDB = async () => {
	try {
		const host = new URL(process.env.MONGO_URI).host
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			// Add any additional options here if needed
		})
		// console.log(`MongoDB connected: ${conn.connection.host}`)
		console.log(`MongoDB connected to host: ${host}`)
	} catch (error) {
		console.log(`Error connecting to MongoDB: ${error.message}`)
		process.exit(1)
	}
}

export default connectDB
