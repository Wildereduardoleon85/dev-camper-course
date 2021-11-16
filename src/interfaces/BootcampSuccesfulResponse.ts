import { BootcampSchema } from './BootcampSchema'
import { Types } from 'mongoose'

export interface BootcampSuccesfulResponse {
  success: boolean
  data:
    | (BootcampSchema & {
        _id: Types.ObjectId | undefined
      })
    | BootcampSchema[]
}
