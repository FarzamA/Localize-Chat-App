import { Server } from 'socket.io';
import { IMessage } from '../models/message.models';

export class WebSocketServer {
  private io: Server;

  constructor(server: any) {
    this.io = new Server(server, { cors: { origin: '*' } });
    this.initializeWebSocketEvents();
  }

  private initializeWebSocketEvents() {
    this.io.on('connection', (socket) => {
      console.log('New client connected');

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }

  public broadcastMessage(message: IMessage) {
    this.io.emit('message', message);
  }
}
