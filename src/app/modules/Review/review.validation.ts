import { z } from 'zod';
const reviewValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Name is required')
      .max(50, { message: 'Name cannot be more than 50 characters' })
      .trim(),
    description: z.string().min(1, 'Description is required').trim(),
    role: z.string(),
    rating: z.number(),
  }),
});
const updateReviewValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().optional(),
    description: z.string().trim().optional(),
    rating: z.number().optional(),
    role: z.string().trim().optional(),
  }),
});

export const ReviewValidation = {
  reviewValidationSchema,
  updateReviewValidationSchema,
};
