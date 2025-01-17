import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TImageFile } from '../../interface/image.interface'
import { IServices } from './service.interface'
import { Service } from './service.model'

const createService = async (payload: IServices, file: TImageFile) => {
  const service = await Service.findOne({ name: payload?.name })
  if (service) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This name is already taken')
  }
  const serviceData: IServices = {
    ...payload,
    icon: file?.path,
  }
  const result = await Service.create(serviceData)
  return result
}

export const ServiceServices = {
  createService,
}
