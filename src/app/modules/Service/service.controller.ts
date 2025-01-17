import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsynch'
import sendResponse from '../../utils/sendResponse'
import { ServiceServices } from './service.service'

const createService = catchAsync(async (req, res) => {
  const service = req.body
  const file: any = req.file
  const result = await ServiceServices.createService(service, file)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service created successfully',
    data: result,
  })
})

const getAllServices = catchAsync(async (req, res) => {
  const result = await ServiceServices.getAllServices()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services retrieved successfully',
    data: result,
  })
})

export const ServiceControllers = {
  createService,
  getAllServices,
}
