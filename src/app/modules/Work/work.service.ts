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

export const WorkServices = {
  createWork,
  getAllWorks,
};
