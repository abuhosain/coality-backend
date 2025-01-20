import { model, Schema } from 'mongoose';
import { IBrand } from './brand.interface';

const brandSchema = new Schema<IBrand>(
  {
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export const Brand = model<IBrand>('Brand', brandSchema);
