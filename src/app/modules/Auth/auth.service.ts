import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TImageFile } from '../../interface/image.interface'
import { ILoginUser, IUser } from './auth.interface'
import { User } from './auth.model'
import { createToken } from './auth.utils'
import config from '../../config'
import { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'

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

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(userData.email)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked

  const userStatus = user?.isBlocked

  if (userStatus === true) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  //checking if the password is correct

  if (!(await User.isUserPasswordMatch(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched')

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  await User.findOneAndUpdate(
    {
      email: userData?.email,
      role: userData?.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  )

  return null;
};



export const AuthServices = {
  signUpUserIntoDb,
  loginUser,
  changePassword,
}
