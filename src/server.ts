import app from './app.ts';
import { env } from './config/env.ts';
import { initRealtime } from './domain/events/Realtime.ts';
import pino from 'pino';
import http from 'http';

const logger = pino();
const server = http.createServer(app);

initRealtime(server);

server.listen(env.PORT, () => {
  logger.info(`Server running on port ${env.PORT}`);
});