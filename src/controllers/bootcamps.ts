import { Request, Response, NextFunction } from 'express'
import { BootcampSuccesfulResponse } from '../interfaces/BootcampSuccesfulResponse'
import ErrorResponse from '../utils/errorResponse'
import { BootcampSchemaModel } from '../models/Bootcamp'
import asyncHandler from '../middlewares/asyncHandler'
import slugify from '../utils/slugify'

//@desc       Get all bootcamps
//@route      GET /api/v1/bootcamps
//@access     Public
export const getBootcamps = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const bootcamps = await BootcampSchemaModel.find()
    const response: BootcampSuccesfulResponse = {
      success: true,
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
    const slug = slugify(req.body.name)
    let body = req.body
    body.slug = slug

    const bootcamp = await BootcampSchemaModel.create(body)
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
export const deleteBootcamps = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete bootcamp ${req.params.id}` })
}
