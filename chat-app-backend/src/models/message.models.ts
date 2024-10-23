import mongoose, { Schema, Document } from 'mongoose';

// Use TypeScript interface to define a message
export interface IMessage extends Document {
  name: string;
  message: string;
  timestamp: Date;
}

// DB Schema
const MessageSchema: Schema = new Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const MessageModel = mongoose.model<IMessage>('Message', MessageSchema);
