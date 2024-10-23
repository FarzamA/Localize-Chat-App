import { Server } from 'socket.io';
import { IMessage } from '../models/message.models';

export class WebSocketServer {
    private io: Server;

    constructor(server: any) {
        this.io = new Server(server, { cors: { origin: '*' } }); // Allow any origin for CORS
        this.initializeWebSocketEvents();
    }

    private initializeWebSocketEvents() {
        this.io.on('connection', (socket) => {
            console.log('New client connected');

            // Listen for new messages from this client
            socket.on('newMessage', (message: IMessage) => {
                console.log('Received new message from client:', message);
                
                // Broadcast the message to all connected clients
                this.broadcastMessage(message);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    public broadcastMessage(message: IMessage) {
        // Broadcast the message to all clients
        this.io.emit('message', message);
    }
}
