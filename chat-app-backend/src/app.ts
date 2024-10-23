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
}
