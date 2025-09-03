import express from 'express';
import cookieParser from 'cookie-parser';
import { corsMiddleware } from './config/cors.ts';
import { errorHandler } from './http/middlewares/errorHandler.ts';
import authRoutes from './http/routes/auth.routes.ts';
import spaceRoutes from './http/routes/space.routes.ts';
import spaceItemRoutes from './http/routes/spaceItem.routes.ts';
import homeRoutes from './routes/homeRoutes.ts';
import uiRoutes from './routes/ui.routes.ts';
import path from 'path';

const app = express();

// Views and static
app.set('view engine', 'ejs');
app.set('views', path.resolve('src', 'views'));
app.use('/public', express.static(path.resolve('public')));

app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(path.resolve('uploads')));

// UI routes
app.use('/', homeRoutes);
app.use('/', uiRoutes);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/spaces', spaceRoutes);
app.use('/api/spaces/:spaceId/items', spaceItemRoutes);

app.use(errorHandler);

export default app;
