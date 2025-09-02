import app from './app.ts';
import { env } from './config/env.ts';
import { initRealtime } from './domain/events/Realtime.ts';
import pino from 'pino';
import http from 'http';
import { connectMongo } from './db/mongo.ts';

const logger = pino();
const server = http.createServer(app);

initRealtime(server);

const start = async () => {
  await connectMongo();
  server.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT}`);
  });
};

start();