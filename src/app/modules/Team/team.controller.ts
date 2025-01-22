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

export const TeamController = {
    createTeam
}