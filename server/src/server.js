import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { errorHandlerMiddleware, notFoundMiddlerare } from './middlewares/error.middleware.js';
import { connectDB } from './lib/database.js';
import productRoutes from './routes/product.routes.js';
import checkoutRoutes from './routes/checkout.routes.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Midllewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("combined"));

// Routes
app.get('/', (req, res) => {
  res.json('Welcome to Store 🚀');
});

app.use('/api/products', productRoutes)
app.use('/api/checkout', checkoutRoutes)

app.use(notFoundMiddlerare);
app.use(errorHandlerMiddleware);

// Database connection
connectDB();

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
    if(process.env.NODE_ENV === 'development') {
        console.log(`Visit http://localhost:${PORT} to see the app`);
    }
})