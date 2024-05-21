import express from 'express';
import { ordersControllers } from './order.controller';
const router = express.Router();
router.post('/', ordersControllers.createOrder);
router.get('/', ordersControllers.getOrder);
export const OrderRoutes = router;
