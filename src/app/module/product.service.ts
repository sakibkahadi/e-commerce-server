import mongoose from 'mongoose';
import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (product: TProduct) => {
  try {
    const isExisting = await ProductModel.findOne({ name: product.name });
    if (!isExisting) {
      const result = await ProductModel.create(product);
      return result;
    }
  } catch (err) {
    console.log(err);
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
    console.log(err);
  }
};

const getSingleProductFromDB = async (productId: string) => {
  try {
    const result = await ProductModel.findById(productId);
    return result;
  } catch (err) {
    console.log(err);
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
    console.log(err);
  }
};

const deleteProductFromDB = async (productId: string) => {
  try {
    const result = await ProductModel.findByIdAndDelete(productId);
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  getSingleProductAndUpdateInDB,
  deleteProductFromDB,
};
