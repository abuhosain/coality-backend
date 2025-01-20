import express, { NextFunction, Request, Response } from 'express';
import { multerUpload } from '../../config/multer.config';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from './auth.constance';
import { AuthServices } from './auth.service';

const router = express.Router();

// signup user
router.post(
  '/signup',
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      throw new AppError(httpStatus.BAD_REQUEST, 'No file uploaded');
    }
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(AuthValidation.userValidationSchema),
  AuthControllers.singupUser,
);

// get me
router.get(
  '/getme',
  auth(USER_ROLE.admin, USER_ROLE.user),
  AuthControllers.getMe,
);

// singin in login
router.post(
  '/login',
  AuthControllers.loginUser,
  validateRequest(AuthValidation.loginValidationSchema),
);

// chnage password
router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

export const AuthRoutes = router;
