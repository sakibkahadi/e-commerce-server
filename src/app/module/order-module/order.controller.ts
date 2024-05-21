import { Request, Response } from 'express';
import { OrderServices } from './order.service';

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
      message: `This product is already in your cart`,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Order is not created' || err.message,
      Error: err,
    });
  }
};

export const orderControllers = {
  createOrder,
};
