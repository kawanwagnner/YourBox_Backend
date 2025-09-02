import { Server } from 'socket.io';

let io: Server;

export function initRealtime(server: any) {
  io = new Server(server, {
    cors: { origin: true, credentials: true },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    // TODO: validar JWT e extrair userId
    if (!token) return next(new Error('Auth required'));
    // Exemplo: socket.join(`user:${userId}`);
    next();
  });
}

export const Realtime = {
  emitToUser(userId: string, event: string, payload: any) {
    if (io) io.to(`user:${userId}`).emit(event, payload);
  },
};
