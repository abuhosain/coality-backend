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


export const ReviewControllers = {
    createReview
}
