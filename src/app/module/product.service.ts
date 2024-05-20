import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (product: TProduct) => {
  try {
    const result = await ProductModel.create(product);
    return result;
  } catch (err) {
    console.log(err);
  }
};
const getAllProductFromDB = async () => {
  try {
    const result = await ProductModel.find();
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
};
