import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TImageFile } from '../../interface/image.interface';
import { IBrand } from './brand.interface';
import { Brand } from './brand.model';

const createBrand = async (payload: IBrand, file: TImageFile) => {
  const BrandData: IBrand = {
    ...payload,
    photo: file?.path,
  };
  const result = await Brand.create(BrandData);
  return result;
};

const getAllBrands = async () => {
  const brands = await Brand.find();
  return brands;
};

const getBrandById = async (id: string) => {
  const brand = await Brand.findById(id);
  if (!brand) {
    throw new AppError(httpStatus.NOT_FOUND, 'Brand not found');
  }
  return brand;
};

export const BrandServices = {
  createBrand,
  getAllBrands,
  getBrandById,
};
