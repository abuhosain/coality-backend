import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsynch';
import sendResponse from '../../utils/sendResponse';
import { TeamServices } from './team.service';

const createTeam = catchAsync(async (req, res) => {
  const team = req.body;
  const file: any = req.file;
  const result = await TeamServices.createTeam(team, file);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team created successfully',
    data: result,
  });
});

const getAllTeam = catchAsync(async (req, res) => {
  const result = await TeamServices.getAllTeam();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team retrieved successfully',
    data: result,
  });
});

const getTeamById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TeamServices.getTeamById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team retrieved successfully',
    data: result,
  });
});

const updateTeam = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const file: any = req?.file;
  const result = await TeamServices.updateTeam(id, payload, file);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team updated successfully',
    data: result,
  });
});

const deleteTeam = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TeamServices.deleteTeam(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Team deleted successfully',
  });
});

export const TeamController = {
  createTeam,
  getAllTeam,
  getTeamById,
  updateTeam,
  deleteTeam,
};
