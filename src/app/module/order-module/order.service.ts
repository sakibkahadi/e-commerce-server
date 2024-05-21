import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

const createOrderIntoDb = async (order: TOrder) => {
  const isExisting = await OrderModel.findOne({ productId: order.productId });
  if (!isExisting) {
    const result = await OrderModel.create(order);
    return result;
  }
};
export const OrderServices = {
  createOrderIntoDb,
};
