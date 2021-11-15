import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`

const connectDB = async (): Promise<void> => {
  const conn = await mongoose.connect(mongoURI)
  console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold)
}

export default connectDB
