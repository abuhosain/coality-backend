import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsynch';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';

const singupUser = catchAsync(async (req, res) => {
  const user = req.body;
  const file: any = req.file;
  const result = await AuthServices.signUpUserIntoDb(user, file);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is registered successfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const user = req?.user;
  const result = await AuthServices.getMe(user as any);
  if(!result){
     
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrive successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  const { accessToken, needsPasswordChange, refreshToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged succesfully',
    data: { needsPasswordChange, accessToken, refreshToken },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const user = req?.user;
  const result = await AuthServices.changePassword(
    user as JwtPayload,
    passwordData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is updated succesfully!',
    data: result,
  });
});

export const AuthControllers = {
  singupUser,
  loginUser,
  changePassword,
  getMe,
};
