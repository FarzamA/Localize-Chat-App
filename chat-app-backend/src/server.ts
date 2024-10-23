import http from 'http';
import mongoose from 'mongoose';
import { App } from './app';
import { WebSocketServer } from './utils/websocket';
import { MessageService } from './services/message.service';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize App and Server
const appInstance = new App();
const server = http.createServer(appInstance.app);

// Initialize WebSocket Server
const websocketServer = new WebSocketServer(server);

// Mongo URI from environment variables
const mongoURI = process.env.MONGO_URI || 'your-fallback-mongo-uri';

// MongoDB Connection
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use WebSocket to broadcast messages when a new one is created
const messageService = new MessageService();
appInstance.app.post('/messages', async (req, res) => {
  const message = await messageService.createMessage(req.body);
  websocketServer.broadcastMessage(message);
  res.status(201).json(message);
});

// Start the server on the PORT specified in the .env file or fallback to 5000
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
