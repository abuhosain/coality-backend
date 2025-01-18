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


export const ReviewServices = {
    createReview
}