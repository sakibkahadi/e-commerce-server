# Express TypeScript E-commerce API

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a MongoDB database named `ecommerce`
4. Run the development server: `npm run dev`

## You can use post man for api calls.

### Products

- **Create Product**: POST `/api/products`
- **Get All Products**: GET `/api/products`
- **Get Product By ID**: GET `/api/products/:productId`
- **Update Product**: PUT `/api/products/:productId`
- **Delete Product**: DELETE `/api/products/:productId`
- **Search Products**: GET `/api/products?searchTerm=`

### Orders

- **Create Order**: POST `/api/orders`
- **Get All Orders**: GET `/api/orders`
- **Get Orders By Email**: GET `/api/orders?email=`
