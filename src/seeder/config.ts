import fs from 'fs'
import path from 'path'
import { Bootcamp } from '../interfaces/Bootcamp'
import connectDB from '../config/db'
import { BootcampSchemaModel } from '../models/Bootcamp'
import 'colorts/lib/string'

// Connect to DB
connectDB()

// Read JSON files
const bootcamps: Bootcamp[] = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '..', '..', '_data', 'bootcamps.json'),
    'utf-8'
  )
)

const importData = async (): Promise<void> => {
  try {
    await BootcampSchemaModel.insertMany(bootcamps)
    console.log('Data imported...'.green.inverse)
  } catch (error) {
    console.error(error)
  }
}

const destroyData = async () => {
  try {
    await BootcampSchemaModel.deleteMany()
    console.log('Data destroyed...'.red.inverse)
  } catch (error) {
    console.error(error)
  }
}

export { importData, destroyData }
