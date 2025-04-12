import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';

import userRoutes from './routes/userRoute.js';
import foodRoutes from './routes/foodRoute.js';
import orderRoutes from './routes/orderRoute.js';
import cartRoutes from './routes/cartRoute.js';
import merchantRoutes from './routes/merchantRoute.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());  // Allow Cross-Origin Requests
app.use(express.json());  // Parse incoming JSON requests

// Health-check route to confirm server is working
app.get('/', (req, res) => res.send('API is working'));

// Swagger UI for API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount all API routes
app.use('/api/users', userRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderRoutes);  // Order routes are integrated here
app.use('/api/cart', cartRoutes);
app.use('/api/merchants', merchantRoutes);

// Start the server and connect to MongoDB
const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("DB connection error:", err));
