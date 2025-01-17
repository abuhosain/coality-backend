import express, { NextFunction, Request, Response } from 'express'
import { multerUpload } from '../../config/multer.config'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import validateRequest from '../../middleware/validateRequest'
import { ServiceValidation } from './service.validation'
import { ServiceControllers } from './service.controller'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../Auth/auth.constance'

const router = express.Router()

// signup user
router.post(
  '/create-service',
  auth(USER_ROLE.admin),
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      throw new AppError(httpStatus.BAD_REQUEST, 'No file uploaded')
    }
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(ServiceValidation.serviceValidationSchema),
  ServiceControllers.createService,
)

// Get all services
router.get('/', ServiceControllers.getAllServices)

// Get service by ID
router.get('/:id', ServiceControllers.getServiceById)

// Update service
router.put(
  '/:id',
  auth(USER_ROLE.admin),
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data)
    }
    next()
  },
  validateRequest(ServiceValidation.updateServiceValidationSchema),
  ServiceControllers.updateService,
)

export const ServiceRoutes = router
