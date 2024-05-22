import { z } from 'zod';

const inventorySchemaZodValidation = z.object({
  quantity: z.number().min(0),
  inStock: z.boolean(),
});

const variantsSchemaZodValidation = z.object({
  type: z.string().nonempty(),
  value: z.string().nonempty(),
});

const productSchemaZodValidation = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  price: z.number().positive(),
  category: z.string().nonempty(),
  tags: z.array(z.string().nonempty()),
  variants: z.array(variantsSchemaZodValidation),
  inventory: inventorySchemaZodValidation,
});

export default productSchemaZodValidation;
