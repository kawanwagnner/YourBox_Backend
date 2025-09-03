import { Server } from 'socket.io';
import { verifyJwt } from '../../libs/jwt.ts';

let io: Server;

export function initRealtime(server: any) {
  io = new Server(server, {
    cors: { origin: true, credentials: true },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Auth required'));
    try {
      const payload: any = verifyJwt(token);
      const userId = payload?.id;
      if (!userId) return next(new Error('Invalid token payload'));
      // attach user info for later use
      (socket as any).user = { id: userId };
      return next();
    } catch (err) {
      return next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    // convenience: join private room for direct emits
    const userId = (socket as any).user?.id;
    if (userId) socket.join(`user:${userId}`);

    socket.on('joinSpace', (spaceId: string) => {
      socket.join(`space:${spaceId}`);
    });
    socket.on('leaveSpace', (spaceId: string) => {
      socket.leave(`space:${spaceId}`);
    });
  });
}

export const Realtime = {
  emitToUser(userId: string, event: string, payload: any) {
    if (io) io.to(`user:${userId}`).emit(event, payload);
  },
  emitToRoom(room: string, event: string, payload: any) {
    if (io) io.to(room).emit(event, payload);
  },
};
