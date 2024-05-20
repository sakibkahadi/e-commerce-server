import express from 'express';
import { ProductControllers } from './product.controller';
const router = express.Router();

router.post('/create-product', ProductControllers.createProduct);
router.get('/', ProductControllers.getAllProduct);

export const ProductRoutes = router;
