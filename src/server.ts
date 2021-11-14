import express, { Application } from 'express'
import dotenv from 'dotenv'
import bootcampsRouter from './routes/bootcamps'
import morgan from 'morgan'

dotenv.config()
const app: Application = express()

// Dev loggin middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/v1/bootcamps', bootcampsRouter)

const port: number | string = process.env.PORT || 5000

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${port}`)
)
