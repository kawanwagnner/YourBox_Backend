import express from 'express';
import cookieParser from 'cookie-parser';
import { corsMiddleware } from './config/cors.ts';
import { errorHandler } from './http/middlewares/errorHandler.ts';
import authRoutes from './http/routes/auth.routes.ts';
import itemRoutes from './http/routes/item.routes.ts';
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
