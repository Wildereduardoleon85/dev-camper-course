import { Request, Response, NextFunction } from 'express'

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.stack.red)
  res.status(500).json({ success: false, error: err.message })
}

export default errorHandler
