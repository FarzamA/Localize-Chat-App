import { IMessage, MessageModel } from '../models/message.models';

export class MessageService {
    public async getMessages(): Promise<IMessage[]> {
        return MessageModel.find().exec();
    }

    public async createMessage(data: { name: string; message: string }): Promise<IMessage> {
        const newMessage = new MessageModel(data);
        return newMessage.save();
    }

    public async deleteMessage(id: string) {
        return await MessageModel.findByIdAndDelete(id);  // Use Mongoose method to delete by ID
    }
}
