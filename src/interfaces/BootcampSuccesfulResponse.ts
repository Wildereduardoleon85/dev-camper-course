import { Bootcamp } from './Bootcamp'
import { Types } from 'mongoose'

export interface BootcampSuccesfulResponse {
  success: boolean
  count?: number
  data?:
    | (Bootcamp & {
        _id: Types.ObjectId | undefined
      })
    | Bootcamp[]
}
