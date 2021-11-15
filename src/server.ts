import express, { Application } from 'express'
import dotenv from 'dotenv'
import bootcampsRouter from './routes/bootcamps'
import morgan from 'morgan'
import connectDB from './config/db'

dotenv.config()
const app: Application = express()

connectDB()

// Dev loggin middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/v1/bootcamps', bootcampsRouter)

const port: number | string = process.env.PORT || 5000

const server = app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${port}`)
)

// handle unhandled promise rejections
process.on('unhandledRejection', (error: any, promise: any) => {
  console.log(`Error: ${error.message}`)
  // close server & exit process
  server.close(() => process.exit(1))
})
