import mongoose from 'mongoose';
import { ProductModel } from './product.model';
import { TProduct } from './product.interface';

const createProductIntoDB = async (product: TProduct) => {
  try {
    const isExisting = await ProductModel.findOne({ name: product.name });
    if (!isExisting) {
      const result = await ProductModel.create(product);
      return result;
    }
  } catch (err) {
    throw Error('something went wrong');
  }
};
const getAllProductFromDB = async (searchTerm?: string) => {
  try {
    let query = {};
    if (searchTerm) {
      query = { name: { $regex: searchTerm, $options: 'i' } };
    }
    const result = await ProductModel.find(query);
    return result;
  } catch (err) {
    throw Error('something went wrong');
  }
};

const getSingleProductFromDB = async (productId: string) => {
  try {
    const result = await ProductModel.findById(productId);
    return result;
  } catch (err) {
    throw Error('something went wrong');
  }
};

const getSingleProductAndUpdateInDB = async (
  productId: string,
  updateData: TProduct,
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error('Invalid product ID');
    }
    const result = await ProductModel.findByIdAndUpdate(
      { _id: productId },
      updateData,
      {
        new: true,
      },
    );

    return result;
  } catch (err) {
    throw Error('something went wrong');
  }
};

const deleteProductFromDB = async (productId: string) => {
  try {
    const result = await ProductModel.findByIdAndDelete(productId);
    return result;
  } catch (err) {
    throw Error('something went wrong');
  }
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  getSingleProductAndUpdateInDB,
  deleteProductFromDB,
};
