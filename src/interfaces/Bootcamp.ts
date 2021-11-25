export interface Bootcamp {
  name: string
  slug: string
  description: string
  website: string
  phone: string
  email: string
  address: string
  location: {
    type: {
      type: 'Point'
    }
    coordinates: {
      type: number
    }
    formatedAddress: string
    street: string
    city: string
    zipcode: string
    country: string
  }
  careers: string[]
  averageRating: number
  averageCost: number
  photo: string
  housing: boolean
  jobAssistance: boolean
  jobGuarantee: boolean
  acceptGi: boolean
  createdAt: number
}
