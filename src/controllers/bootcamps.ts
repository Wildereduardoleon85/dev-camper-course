import { Request, Response, NextFunction } from 'express'
import { BootcampSuccesfulResponse } from '../interfaces/BootcampSuccesfulResponse'
import { ErrorResponse } from '../interfaces/ErrorResponse'
import { BootcampSchemaModel } from '../models/Bootcamp'

const errorResponse = (err: any): ErrorResponse => {
  return {
    success: false,
    msg: err,
  }
}

//@desc       Get all bootcamps
//@route      GET /api/v1/bootcamps
//@access     Public
export const getBootcamps = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bootcamps = await BootcampSchemaModel.find()
    const response: BootcampSuccesfulResponse = {
      success: true,
      data: bootcamps,
    }
    res.status(200).json(response)
  } catch (err: any) {
    res.status(500).json(errorResponse(err.message))
  }
}

//@desc       Get single bootcamps
//@route      GET /api/v1/bootcamps/:id
//@access     Public
export const getBootcamp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const bootcamp = await BootcampSchemaModel.findById(req.params.id)
    if (!bootcamp) {
      return res.status(400).json({
        success: false,
        msg: `Cast to ObjectId failed for value \"${req.params.id}\" (type string) at path \"_id\" for model \"Bootcamp\"`,
      })
    }
    const response: BootcampSuccesfulResponse = {
      success: true,
      data: bootcamp,
    }
    res.status(200).json(response)
  } catch (err: any) {
    next(err)
  }
}

//@desc       Create a bootcamp
//@route      POST /api/v1/bootcamps
//@access     Private
export const createBootcamp = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bootcamp = await BootcampSchemaModel.create(req.body)
    const response: BootcampSuccesfulResponse = {
      success: true,
      data: bootcamp,
    }
    res.status(201).json(response)
  } catch (err: any) {
    res.status(400).json(errorResponse(err.message))
  }
}

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
