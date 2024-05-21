import { ProductModel } from '../product.model';
import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

const createOrderIntoDb = async (order: TOrder) => {
  const result = await OrderModel.create(order);
  const filter = await ProductModel.findById(order.productId);
  if (filter) {
    return result;
  }
};
export const OrderServices = {
  createOrderIntoDb,
};
