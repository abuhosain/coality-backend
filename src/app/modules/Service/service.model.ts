import { model, Schema, Types } from 'mongoose'
import { IServices } from './service.interface'

const serviceSchema = new Schema<IServices>({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, {
  versionKey : false
})

export const Service = model<IServices>('Service', serviceSchema)
