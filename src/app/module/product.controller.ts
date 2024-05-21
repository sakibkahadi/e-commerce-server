import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import { TProduct } from './product.interface';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;
    const result = await ProductServices.createProductIntoDB(product);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Product created successfully',
        data: result,
      });
    }

    res.status(500).json({
      success: false,
      message: `${product.name} is already exists`,
    });
  } catch (err: any) {
    res.status(500).json({
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
    res.status(200).json({
      success: true,
      message: 'Products are retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
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
    res.status(200).json({
      success: true,
      message: 'product is found',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
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

    const result = await ProductServices.getSingleProductAndUpdateInDB(
      productId,
      product,
    );
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
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
      res.status(200).json({
        success: true,
        message: 'product is deleted successfully',
        data: null,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'something went wrong',
      });
    }
  } catch (err: any) {
    res.status(500).json({
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
