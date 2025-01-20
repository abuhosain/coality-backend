import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../Auth/auth.constance';
import validateRequest from '../../middleware/validateRequest';
import { multerUpload } from '../../config/multer.config';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { BrandValidation } from './brand.validation';
import { BrandControllers } from './brand.controller';

const router = express.Router();

// create review
router.post(
  '/create-brand',
  auth(USER_ROLE.admin),
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      throw new AppError(httpStatus.BAD_REQUEST, 'No file uploaded');
    }
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(BrandValidation.brandValidationSchema),
  BrandControllers.createBrand,
);

router.get('/', BrandControllers.getAllBrands);

// router.get('/:id', ReviewControllers.getReviewById);

// // Update review
// router.put(
//   '/:id',
//   auth(USER_ROLE.admin),
//   multerUpload.single('file'),
//   (req: Request, res: Response, next: NextFunction) => {
//     if (req.body.data) {
//       req.body = JSON.parse(req.body.data);
//     }
//     next();
//   },
//   validateRequest(ReviewValidation.updateReviewValidationSchema),
//   ReviewControllers.updateReview,
// );

export const BrandsRoutes = router;
