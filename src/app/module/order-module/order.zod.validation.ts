import { z } from 'zod';
import { Types } from 'mongoose';

export const OrderSchemaZodValidation = z.object({
  email: z.string().email(),
  productId: z.instanceof(Types.ObjectId),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

export default OrderSchemaZodValidation;
