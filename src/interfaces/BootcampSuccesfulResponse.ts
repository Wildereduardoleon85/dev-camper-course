import { Bootcamp } from './Bootcamp'
import { Types } from 'mongoose'

export interface BootcampSuccesfulResponse {
  success: boolean
  data:
    | (Bootcamp & {
        _id: Types.ObjectId | undefined
      })
    | Bootcamp[]
}
