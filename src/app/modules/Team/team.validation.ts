import { z } from 'zod';
const teamValidation = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Name is required')
      .max(50, { message: 'Name cannot be more than 50 characters' })
      .trim(),
    role: z.string().min(1, 'role is required').trim(),
  }),
});
const updateTeamValidation = z.object({
  body: z.object({
    name: z.string().trim().optional(),
    role: z.string().trim().optional(),
  }),
});

export const TeamValidation = {
  teamValidation,
  updateTeamValidation,
};
