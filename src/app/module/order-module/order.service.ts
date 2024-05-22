import { ProductModel } from '../product-module/product.model';
import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

const createOrderIntoDb = async (order: TOrder) => {
  try {
    const result = await OrderModel.create(order);
    const filter = await ProductModel.findById(order.productId);
    if (filter?._id) {
      return result;
    }
  } catch (err) {
    throw Error('something went wrong');
  }
};

const getOrdersFromDb = async (email?: string) => {
  try {
    let query = {};
    if (email) {
      query = { email: { $regex: email, $options: 'i' } };
    }
    const result = await OrderModel.find(query);

    return result;
  } catch (err) {
    throw Error('something went wrong');
  }
};
export const OrderServices = {
  createOrderIntoDb,
  getOrdersFromDb,
};
