import { z } from 'zod'
const serviceValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Name is required')
      .max(50, { message: 'Name cannot be more than 50 characters' })
      .trim(),
    description: z.string().min(1, 'Description is required').trim(),
  }),
})
const updateServiceValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().optional(),
    description: z.string().trim().optional(),
  }),
})

export const ServiceValidation = {
  serviceValidationSchema,
  updateServiceValidationSchema
}
