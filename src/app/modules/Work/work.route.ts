import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middleware/auth';
import { multerUpload } from '../../config/multer.config';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import validateRequest from '../../middleware/validateRequest';
import { WorkControllers } from './work.controller';
import { WorkValidation } from './work.validation';
import { USER_ROLE } from '../Auth/auth.constance';

const router = express.Router();

router.post(
  '/create-work',
  auth(USER_ROLE.admin),
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      throw new AppError(httpStatus.BAD_REQUEST, 'No file uploaded');
    }
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(WorkValidation.workValidationSchema),
  WorkControllers.createWork,
);

router.get('/', WorkControllers.getAllWorks);

router.get('/:id', WorkControllers.getWorkById);

export const WorkRoutes = router;
