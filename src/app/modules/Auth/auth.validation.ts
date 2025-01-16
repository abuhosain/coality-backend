import { z } from 'zod'
const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Name is required')
      .max(50, { message: 'Name cannot be more than 50 characters' })
      .trim(),
    email: z
      .string()
      .email('Invalid email format')
      .min(1, 'Email is required')
      .trim(),
    password: z
      .string()
      .min(1, 'Password is required')
      .max(20, { message: 'Password cannot be more than 20 characters' })
      .trim()
      .optional(),
    phone: z
      .string()
      .regex(/^\d{10,15}$/, { message: 'Phone number must be between 10 and 15 digits' })
      .min(1, 'Phone number is required')
      .trim(),
  }),
});


const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'email  is required.' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
})
const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z.string({ required_error: 'Password is required' }),
  }),
})

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
})

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'User id is required!',
    }),
  }),
})

const resetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'User id is required!',
    }),
    newPassword: z.string({
      required_error: 'User password is required!',
    }),
  }),
})

export const AuthValidation = {
  userValidationSchema,
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
}
