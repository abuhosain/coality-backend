import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsynch';
import sendResponse from '../../utils/sendResponse';
import { ReviewServices } from './review.service';

const createReview = catchAsync(async (req, res) => {
  const review = req.body;
  const file: any = req.file;
  const result = await ReviewServices.createReview(review, file);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review created successfully',
    data: result,
  });
});

const getAllReviews = catchAsync(async (req, res) => {
  const result = await ReviewServices.getAllReviews();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All reviews retrieved successfully',
    data: result,
  });
});

const getReviewById = catchAsync(async (req, res) => {
  const result = await ReviewServices.getReviewById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review retrieved successfully',
    data: result,
  });
});

const deleteReviewById = catchAsync(async (req, res) => {
  const result = await ReviewServices.deleteReview(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted successfully',
    data: result,
  });
});

const updateReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const file: any = req?.file;
  const result = await ReviewServices.updateReview(id, payload, file);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review updated successfully',
    data: result,
  });
});

export const ReviewControllers = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReviewById,
};
