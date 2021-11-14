import { Request, Response, NextFunction } from 'express'

//@desc       Get all bootcamps
//@route      GET /api/v1/bootcamps
//@access     Public
export const getBootcamps = (
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.status(200).json({ success: true, msg: 'Show all bootcamps' })
}

//@desc       Get single bootcamps
//@route      GET /api/v1/bootcamps/:id
//@access     Public
export const getBootcamp = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(200).json({ success: true, msg: `Get bootcamp ${req.params.id}` })
}

//@desc       Create a bootcamp
//@route      POST /api/v1/bootcamps
//@access     Private
export const createBootcamp = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(200).json({ success: true, msg: 'Create new bootcamp' })
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
