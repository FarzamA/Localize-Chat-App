import express, { Application } from 'express';
import cors from 'cors';
import { MessageController } from './controllers/mesage.controller';

export class App {
  public app: Application;
  private messageController: MessageController;

  constructor() {
    this.app = express();
    this.messageController = new MessageController();
    this.initializeMiddlewares();
    this.initializeControllers();
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private initializeControllers() {
    this.app.use('/messages', this.messageController.router);
  }

  public listen(port: number) {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

// Export an instance of App for testing purposes
export default new App().app;
