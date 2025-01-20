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

const getAllBrands = catchAsync(async (req, res) => {
  const result = await BrandServices.getAllBrands();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All brands retrieved successfully',
    data: result,
  });
});

const getBrandById = catchAsync(async (req, res) => {
  const result = await BrandServices.getBrandById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand retrieved successfully',
    data: result,
  });
});

const updateBrand = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const file: any = req?.file;
  const result = await BrandServices.updateBrand(id, payload, file);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand updated successfully',
    data: result,
  });
});

export const BrandControllers = {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
};
