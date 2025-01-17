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

const getServiceById = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ServiceServices.getServiceById(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service retrieved successfully',
    data: result,
  })
})

const updateService = catchAsync(async (req, res) => {
  const { id } = req.params
  const payload = req.body
  const file: any = req?.file
  const result = await ServiceServices.updateService(id, payload, file)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service updated successfully',
    data: result,
  })
})

export const ServiceControllers = {
  createService,
  getAllServices,
  getServiceById,
  updateService
}
