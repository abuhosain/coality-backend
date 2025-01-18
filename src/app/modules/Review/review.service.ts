import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TImageFile } from '../../interface/image.interface';
import { IReview } from './review.interface';
import { Review } from './review.model';

const createReview = async (payload: IReview, file: TImageFile) => {
  const ReviewData: IReview = {
    ...payload,
    photo: file?.path,
  };
  const result = await Review.create(ReviewData);
  return result;
};

const getAllReviews = async () => {
  const reviews = await Review.find();
  return reviews;
};

const getReviewById = async (id: string) => {
  const review = await Review.findById(id);
  if (!review) {
    throw new AppError(httpStatus.NOT_FOUND, 'Review not found');
  }
  return review;
};

export const ReviewServices = {
  createReview,
  getAllReviews,
  getReviewById
};
