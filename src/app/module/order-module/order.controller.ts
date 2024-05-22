import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import OrderSchemaZodValidation from './order.zod.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;

    const result = await OrderServices.createOrderIntoDb(order);

    if (result) {
      return res.status(200).json({
        success: true,
        message: 'Order is created successfully',
        data: result,
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Product is not exists',
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const result = await OrderServices.getOrdersFromDb(email);
    const data: any = result?.length;
    if (email && data > 0) {
      return res.status(200).json({
        success: true,
        message: `${email} orders data retrieve successfully`,
        data: result,
      });
    } else if (data > 0) {
      return res.status(200).json({
        success: true,
        message: 'orders are retrieve successfully',
        data: result,
      });
    }
    return res.status(200).json({
      success: true,
      message: 'No Data Found',
      data: result,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};
export const ordersControllers = { createOrder, getOrder };
