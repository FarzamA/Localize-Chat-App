import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  message: string;
  timestamp: Date;
}

const MessageSchema: Schema = new Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const MessageModel = mongoose.model<IMessage>('Message', MessageSchema);
