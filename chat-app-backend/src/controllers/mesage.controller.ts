import { Router, Request, Response } from 'express';
import { MessageService } from '../services/message.service';

export class MessageController {
  public router: Router;
  private messageService: MessageService;

  constructor() {
    this.router = Router();
    this.messageService = new MessageService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.getAllMessages);
    this.router.post('/', this.createMessage);
    this.router.delete('/:id', this.deleteMessage); 
  }

  private getAllMessages = async (req: Request, res: Response) => {
    try {
      const messages = await this.messageService.getMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  private createMessage = async (req: Request, res: Response) => {
    try {
      const message = await this.messageService.createMessage(req.body);
      res.status(201).json(message);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  private deleteMessage = async (req: Request, res: Response) => {
    const { id } = req.params;  // Get the ID from request parameters
    try {
      const deletedMessage = await this.messageService.deleteMessage(id);
      if (deletedMessage) {
        res.status(200).json({ message: 'Message deleted successfully' });
      } else {
        res.status(404).json({ message: 'Message not found' });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };
}
