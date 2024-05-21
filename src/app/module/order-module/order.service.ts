import { ProductModel } from '../product.model';
import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

const createOrderIntoDb = async (order: TOrder) => {
  try {
    const result = await OrderModel.create(order);
    const filter = await ProductModel.findById(order.productId);
    if (filter) {
      return result;
    }
  } catch (err) {
    console.log(err);
  }
};

const getOrdersFromDb = async (email?: string) => {
  try {
    let query = {};
    if (email) {
      query = { email: { $regex: email, $options: 'i' } };
    }
    const result = await OrderModel.find(query);
    // console.log(result.length);
    return result;
  } catch (err) {
    console.log(err);
  }
};
export const OrderServices = {
  createOrderIntoDb,
  getOrdersFromDb,
};
