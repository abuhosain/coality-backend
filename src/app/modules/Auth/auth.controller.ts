import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsynch'
import sendResponse from '../../utils/sendResponse'
import { AuthServices } from './auth.service'

const singupUser = catchAsync(async (req, res) => {
  const user = req.body
  const file: any = req.file
  const result = await AuthServices.signUpUserIntoDb(user, file)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is registered successfully',
    data: result,
  })
})

export const AuthControllers = {
  singupUser,
}
