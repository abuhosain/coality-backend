import { string, z } from 'zod';
import { WorkType } from './work.interface';

const workValidationSchema = z.object({
  body: z.object({
    type: z
      .string()
      .min(2, 'Type is required')
      .max(500, 'Type cannot exceed 500 characters')
      .trim(),
    description: z
      .string()
      .min(1, 'Description is required')
      .max(500, 'Description cannot exceed 500 characters')
      .trim(),
    tag: z
      .array(z.string())
      .min(1, 'Tag is required')
      .max(50, 'Tag cannot exceed 50 characters'),
    date: z.string(),
    video_link: z.string().url('Video link must be a valid URL').optional(),
    category: z
      .string()
      .max(100, 'Category cannot exceed 100 characters')
      .optional(),
    design_link: z.string().url('Design link must be a valid URL').optional(),
    live_link: z.string().url('Live link must be a valid URL').optional(),
  }),
});

const updateWorkValidationSchema = z.object({
  body: z.object({
    type: z
      .string()
      .min(2, 'Type is required')
      .max(500, 'Type cannot exceed 500 characters')
      .trim(),
    description: z.string().max(500).trim().optional(),
    photo: z.string().url().optional(),
    tag: z.string().max(50).trim().optional(),
    date: z.date().optional(),
    video_link: z.string().url().optional(),
    category: z.string().max(100).optional(),
    design_link: z.string().url().optional(),
    live_link: z.string().url().optional(),
  }),
});

export const WorkValidation = {
  workValidationSchema,
  updateWorkValidationSchema,
};
