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

export const ServiceValidation = {
  serviceValidationSchema,
}
