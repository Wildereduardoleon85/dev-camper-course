import { Request, Response, NextFunction } from 'express'
import { BootcampSuccesfulResponse } from '../interfaces/BootcampSuccesfulResponse'
import ErrorResponse from '../utils/errorResponse'
import { BootcampSchemaModel } from '../models/Bootcamp'
import asyncHandler from '../middlewares/asyncHandler'
import geocoder from '../utils/geocoder'
import { doesNotMatch } from 'assert'

//@desc       Get all bootcamps
//@route      GET /api/v1/bootcamps
//@access     Public
export const getBootcamps = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { select, sort } = req.query

    let query
    const reqQuery = { ...req.query }

    // Fileds to exclude
    const removeFileds = ['select']

    // Loop over remove fields and delete them from reqQuery
    removeFileds.forEach((param) => delete reqQuery[param])

    let qs = JSON.stringify(reqQuery)
    qs = qs.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)
    query = BootcampSchemaModel.find(JSON.parse(qs))

    const cleanQuery = (fields: string): string => {
      return fields.split(',').join(' ')
    }

    // Select fields
    if (select) {
      query = query.select(cleanQuery(<string>select))
    }

    if (sort) {
      query = query.sort(cleanQuery(<string>sort))
    } else {
      query = query.sort('-createdAt')
    }

    const bootcamps = await query

    const response: BootcampSuccesfulResponse = {
      success: true,
      count: bootcamps.length,
      data: bootcamps,
    }
    res.status(200).json(response)
  }
)

//@desc       Get single bootcamps
//@route      GET /api/v1/bootcamps/:id
//@access     Public
export const getBootcamp = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<any, Record<string, any>>> => {
    const bootcamp = await BootcampSchemaModel.findById(req.params.id)

    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      )
    }
    const response: BootcampSuccesfulResponse = {
      success: true,
      data: bootcamp,
    }
    res.status(200).json(response)
  }
)

//@desc       Create a bootcamp
//@route      POST /api/v1/bootcamps
//@access     Private
export const createBootcamp = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const bootcamp = await BootcampSchemaModel.create(req.body)
    const response: BootcampSuccesfulResponse = {
      success: true,
      data: bootcamp,
    }
    res.status(201).json(response)
  }
)

//@desc       Update bootcamps
//@route      PUT /api/v1/bootcamps/:id
//@access     Private
export const updateBootcamps = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res
    .status(200)
    .json({ success: true, msg: `Update bootcamp ${req.params.id}` })
}

//@desc       Delete bootcamp
//@route      DELETE /api/v1/bootcamps/:id
//@access     Private
export const deleteBootcamps = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params
    const bootcamp = await BootcampSchemaModel.findByIdAndDelete(id)
    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id of ${id}`, 404))
    }
    const response: BootcampSuccesfulResponse = {
      success: true,
    }
    res.status(200).json(response)
  }
)

//@desc       Get Bootcamps within a radius
//@route      GET /api/v1/bootcamps/radius/:zipcode/:distance/
//@access     Private
export const getBootcampsInRadius = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { zipcode, distance } = req.params

    // Get lat an long from geocoder
    const loc = await geocoder.geocode(zipcode)
    const lat = loc[0].latitude
    const lon = loc[0].longitude

    // Calc radius
    // Divide distance by radius of earth
    // Earth radius = 3963 mi / 6378 Km
    const radius: number = Number(distance) / 3963

    const bootcamps = await BootcampSchemaModel.find({
      location: { $geoWithin: { $centerSphere: [[lon, lat], radius] } },
    })

    const response: BootcampSuccesfulResponse = {
      success: true,
      count: bootcamps.length,
      data: bootcamps,
    }

    res.status(200).json(response)
  }
)
