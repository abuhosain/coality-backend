import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsynch';
import sendResponse from '../../utils/sendResponse';
import { BrandServices } from './brand.service';

const createBrand = catchAsync(async (req, res) => {
  const brand = req.body;
  const file: any = req.file;
  const result = await BrandServices.createBrand(brand, file);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand created successfully',
    data: result,
  });
});

export const BrandControllers = {
  createBrand,
};
