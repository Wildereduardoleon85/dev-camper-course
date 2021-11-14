import express from 'express'
import dotenv from 'dotenv'
import bootcampsRouter from './routes/bootcamps.js'

dotenv.config()
const app = express()

app.use('/api/v1/bootcamps', bootcampsRouter)

const port = process.env.PORT || 5000

app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${port}`))