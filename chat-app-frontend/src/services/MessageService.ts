import axios from 'axios';

export interface Message {
  _id: string;
  name: string;
  message: string;
  timestamp: string;
}

export class MessageService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'http://localhost:5000';
  }

  // Fetch all messages
  async fetchMessages(): Promise<Message[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/messages`);
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

  // Post a new message
  async postMessage(name: string, message: string): Promise<Message> {
    try {
      const response = await axios.post(`${this.baseUrl}/messages`, { name, message });
      return response.data;
    } catch (error) {
      console.error('Error posting message:', error);
      throw error;
    }
  }
}
