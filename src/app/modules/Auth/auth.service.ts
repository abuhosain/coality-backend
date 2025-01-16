import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TImageFile } from '../../interface/image.interface'
import { ILoginUser, IUser } from './auth.interface'
import { User } from './auth.model'
import { createToken } from './auth.utils'
import config from '../../config'

const signUpUserIntoDb = async (payload: IUser, file: TImageFile) => {
  const user = await User.findOne({ email: payload.email })
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This email is already taken')
  }

  const userData: IUser = {
    ...payload,
    profilePicture: file.path,
  }
  const result = await User.create(userData)
  return result
}

const loginUser = async (payload: ILoginUser) => {
  const user = await User.isUserExistsByEmail(payload?.email)

  // if user not found
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found')
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This user is Deleted')
  }
  if (user.isBlocked) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This user is Blocked')
  }

  if (!(await User.isUserPasswordMatch(payload?.password, user?.password))) {
    throw new AppError(httpStatus.NOT_FOUND, 'Incorrect password')
  }

  // access Granted token and refresh token;
  //   create token and sent to the client

  const jwtPayload = {
    id: user?._id,
    email: user?.email,
    role: user?.role,
    name: user?.name,
    profilePicture: user?.profilePicture,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string,
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refrsh_expire_in as string,
  )

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  }
}

export const AuthServices = {
  signUpUserIntoDb,
  loginUser,
}
