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

export const BrandServices = {
  createBrand,
  getAllBrands,
};
