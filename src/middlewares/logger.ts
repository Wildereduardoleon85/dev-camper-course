import { Request, Response, NextFunction } from 'express'

export const logger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { method, protocol, originalUrl } = req
  console.log(`${method} ${protocol}://${req.get('host')}${originalUrl}`)
  next()
}
