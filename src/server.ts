import express, { Application } from 'express'
import dotenv from 'dotenv'
import bootcampsRouter from './routes/bootcamps'
import morgan from 'morgan'
import 'colorts/lib/string'
import connectDB from './config/db'
import errorHandler from './middlewares/error'
import geocoder from './utils/geocoder'

// Enviroment Variables
dotenv.config()

// Application Initialization
const app: Application = express()

// Database Connection
connectDB()

// Body Parser
app.use(express.json())

// Dev loggin middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Routes
app.use('/api/v1/bootcamps', bootcampsRouter)

// Error Middleware
app.use(errorHandler)

const port: number | string = process.env.PORT || 5000

const server = app.listen(port, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port: ${port}`.yellow
      .bold
  )
)

// handle unhandled promise rejections
process.on('unhandledRejection', (error: any) => {
  console.log(`Error: ${error.message}`.red)
  // close server & exit process
  server.close(() => process.exit(1))
})
