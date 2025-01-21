import { model, Schema } from 'mongoose';
import { IWork, WorkType } from './work.interface';

const workSchema = new Schema<IWork>(
  {
    type: {
      type: String,
      enum: Object.values(WorkType),
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    tag: {
      type: [String],
      required: true,
    },
    date: {
      type: Date,
    },
    video_link: {
      type: String,
    },
    category: {
      type: String,
    },
    design_link: {
      type: String,
    },
    live_link: {
      type: String,
    },
  },
  {
    versionKey: false,
  },
);

export const Work = model<IWork>('Work', workSchema);
