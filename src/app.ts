import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/module/product-module/product.route';
import { OrderRoutes } from './app/module/order-module/order.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Catch-all route handler for undefined routes (404)
app.use((req: Request, res: Response) => {
  res.status(500).json({
    success: false,
    message: 'Route is not found',
  });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong',
    error: err.message,
  });
});

export default app;
