import { z } from 'zod';
const brandValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Name is required')
      .max(50, { message: 'Name cannot be more than 50 characters' })
      .trim(),
  }),
});
const updateBrandValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().optional(),
  }),
});

export const BrandValidation = {
  brandValidationSchema,
  updateBrandValidationSchema,
};
