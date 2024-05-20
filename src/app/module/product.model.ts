import mongoose from 'mongoose';
import { TInventory, TProduct, TVariants } from './product.interface';
const { Schema } = mongoose;

const inventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean },
});
const variantsSchema = new Schema<TVariants>({
  type: { type: String, require: true },
  value: { type: String, require: true },
});
const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: [variantsSchema],
  inventory: inventorySchema,
});
