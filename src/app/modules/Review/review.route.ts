import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../Auth/auth.constance';
import validateRequest from '../../middleware/validateRequest';
import { ReviewValidation } from './review.validation';
import { ReviewControllers } from './review.controller';
import { multerUpload } from '../../config/multer.config';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const router = express.Router();

// create review
router.post(
  '/create-review',
  auth(USER_ROLE.admin),
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      throw new AppError(httpStatus.BAD_REQUEST, 'No file uploaded');
    }
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(ReviewValidation.reviewValidationSchema),
  ReviewControllers.createReview,
);

router.get(
  '/',
  ReviewControllers.getAllReviews,
);


export const ReviewRoutes = router;