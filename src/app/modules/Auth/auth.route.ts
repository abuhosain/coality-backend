import express, { NextFunction, Request, Response } from 'express'
import { multerUpload } from '../../config/multer.config'
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import validateRequest from '../../middleware/validateRequest'
import { AuthValidation } from './auth.validation'
import { AuthControllers } from './auth.controller'

const router = express.Router()

// signup user
router.post(
  '/signup',
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      throw new AppError(httpStatus.BAD_REQUEST, 'No file uploaded')
    }
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(AuthValidation.userValidationSchema),
  AuthControllers.singupUser,
)

// singin in login
router.post(
  '/login',
  AuthControllers.loginUser,
  validateRequest(AuthValidation.loginValidationSchema),
)

export const AuthRoutes = router
