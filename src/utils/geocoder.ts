import NodeGeocoder, { Options } from 'node-geocoder'
import dotenv from 'dotenv'
dotenv.config()

const options: Options = {
  provider: 'mapquest',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
}

const geocoder = NodeGeocoder(options)

export default geocoder
