import express from 'express';
import cookieParser from 'cookie-parser';
import { corsMiddleware } from './config/cors.js';
import { errorHandler } from './http/middlewares/errorHandler.js';
import authRoutes from './http/routes/auth.routes.js';
import itemRoutes from './http/routes/item.routes.js';
import path from 'path';

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(path.resolve('uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

app.use(errorHandler);

export default app;
