import app from './app.js';
import { env } from './config/env.js';
import { initRealtime } from './domain/events/Realtime.js';
import pino from 'pino';
import http from 'http';

const logger = pino();
const server = http.createServer(app);

initRealtime(server);

server.listen(env.PORT, () => {
  logger.info(`Server running on port ${env.PORT}`);
});