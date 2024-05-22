import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import { TProduct } from './product.interface';
import productSchemaZodValidation from './product.zod.validation';
import { get } from 'mongoose';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;
    // using zod validation
    const zodParsedData = productSchemaZodValidation.parse(product);

    const result = await ProductServices.createProductIntoDB(zodParsedData);
    if (result) {
      return res.status(200).json({
        success: true,
        message: 'Product created successfully',
        data: result,
      });
    }

    return res.status(500).json({
      success: false,
      message: `${product.name} is already exists`,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Product is not created' || err.message,
      Error: err,
    });
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    // console.log(searchTerm);
    const result = await ProductServices.getAllProductFromDB(searchTerm);
    return res.status(200).json({
      success: true,
      message: 'Products are retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Something went Wrong' || err.message,
      Error: err,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    if (result) {
      return res.status(200).json({
        success: true,
        message: 'product is found',
        data: result,
      });
    }
    return res.status(500).json({
      success: true,
      message: 'product is not found',
      data: null,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Something went Wrong' || err.message,
      Error: err,
    });
  }
};

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;
    const { productId } = req.params;
    const zodParsedData = productSchemaZodValidation.parse(product);
    const result = await ProductServices.getSingleProductAndUpdateInDB(
      productId,
      zodParsedData,
    );
    if (!result) {
      return res.status(200).json({
        success: true,
        message: 'Product is not found ',
        data: result,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: result,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Something went Wrong' || err.message,
      Error: err,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductFromDB(productId);
    if (result) {
      return res.status(200).json({
        success: true,
        message: 'product is deleted successfully',
        data: null,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'something went wrong',
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Something went Wrong' || err.message,
      Error: err,
    });
  }
};
export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteProduct,
};
