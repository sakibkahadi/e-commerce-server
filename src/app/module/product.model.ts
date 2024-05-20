import mongoose, { model } from 'mongoose';
import { TInventory, TProduct, TVariants } from './product.interface';
const { Schema } = mongoose;

const inventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});
const variantsSchema = new Schema<TVariants>({
  type: { type: String, require: true },
  value: { type: String, require: true },
});
const productSchema = new Schema<TProduct>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, unique: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [variantsSchema], required: true },
  inventory: { type: inventorySchema, required: true },
});

export const ProductModel = model<TProduct>('Products', productSchema);
