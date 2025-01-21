import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TImageFile } from '../../interface/image.interface';
import { IWork } from './work.interface';
import { Work } from './work.model';

const createWork = async (payload: IWork, file: TImageFile) => {
  const workData: IWork = {
    ...payload,
    photo: file?.path,
  };
  const result = await Work.create(workData);
  return result;
};

const getAllWorks = async () => {
  const works = await Work.find();
  return works;
};

const getWorkById = async (id: string) => {
  const work = await Work.findById(id);
  if (!work) {
    throw new AppError(httpStatus.NOT_FOUND, 'Work not found');
  }
  return work;
};

const updateWork = async (
  id: string,
  payload: Partial<IWork>,
  file?: TImageFile,
) => {
  const work = await Work.findById(id);
  if (!work) {
    throw new AppError(httpStatus.NOT_FOUND, 'Work not found');
  }
  const updatedData = {
    ...payload,
    photo: file?.path || work.photo,
  };
  const updatedWork = await Work.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return updatedWork;
};

const deleteWork = async (id: string) => {
  const result = await Work.findByIdAndDelete(id);
  return result;
};

export const WorkServices = {
  createWork,
  getAllWorks,
  getWorkById,
  updateWork,
  deleteWork
};
