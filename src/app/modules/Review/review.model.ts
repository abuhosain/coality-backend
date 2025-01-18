import { model, Schema } from 'mongoose';
import { IReview } from './review.interface';

const reviewSchema = new Schema<IReview>({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 5,
  },
  role: {
    type: String,
    required: true,
  },
},
{
  versionKey : false
});

export const Review = model<IReview>('Review', reviewSchema);
