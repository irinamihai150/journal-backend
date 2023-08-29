import mongoose from "mongoose"

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			// Add any additional options here if needed
		})
		console.log(`MongoDB connected: ${conn.connection.host}`)
	} catch (error) {
		console.log(`Error connecting to MongoDB: ${error.message}`)
		process.exit(1)
	}
}

export default connectDB
