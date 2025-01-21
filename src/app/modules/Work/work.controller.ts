import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsynch';
import sendResponse from '../../utils/sendResponse';
import { WorkServices } from './work.service';

const createWork = catchAsync(async (req, res) => {
  const work = req.body;
  const file: any = req.file;
  const result = await WorkServices.createWork(work, file);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Work created successfully',
    data: result,
  });
});

const getAllWorks = catchAsync(async (req, res) => {
  const result = await WorkServices.getAllWorks();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All works retrieved successfully',
    data: result,
  });
});

const getWorkById = catchAsync(async (req, res) => {
  const result = await WorkServices.getWorkById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Work retrieved successfully',
    data: result,
  });
});

const updateWork = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const file: any = req?.file;
  const result = await WorkServices.updateWork(id, payload, file);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Work updated successfully',
    data: result,
  });
});

const deleteWork = catchAsync(async (req, res) => {
  const result = await WorkServices.deleteWork(req?.params?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Work deleted successfully',
    data: result,
  });
});

export const WorkControllers = {
  createWork,
  getAllWorks,
  getWorkById,
  updateWork,
  deleteWork,
};
