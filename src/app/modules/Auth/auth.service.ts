import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TImageFile } from '../../interface/image.interface'
import { IUser } from './auth.interface'
import { User } from './auth.model'

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

export const AuthServices = {
  signUpUserIntoDb,
}
