import { Types } from 'mongoose'

export interface BootcampSchema {
  _id?: Types.ObjectId
  name: string
  slug: string
  description: string
  website: string
  phone: string
  email: string
  address: string
  location: string
  coordinates: number
  formatedAddress: string
  street: string
  city: string
  zipcode: string
  country: string
  careers: string[]
  averageRating: number
  averageCost: number
  photo: string
  housing: boolean
  jobAssistance: boolean
  jobGuarantee: boolean
  acceptGi: boolean
  createdAt: number
  __v?: number
}
