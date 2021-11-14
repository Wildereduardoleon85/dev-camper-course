import express, { Router } from 'express'
import {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamps,
  deleteBootcamps,
} from '../controllers/bootcamps'

const bootcampsRouter: Router = express.Router()

bootcampsRouter.route('/').get(getBootcamps).post(createBootcamp)

bootcampsRouter
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamps)
  .delete(deleteBootcamps)

export default bootcampsRouter
