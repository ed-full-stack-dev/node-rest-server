import express from 'express';
import Controller from './interfaces/controller.interface';
import mongoose from 'mongoose';
import middlewares from './utils/middleware';
import dotenv from 'dotenv';
import errorMiddleware from './middleware/error.middleware';
import { createServer, Server as HTTPServer } from 'http';
import WebSocketHandler from './handlers/web-socket.handler';
mongoose.set('strictQuery', false);
dotenv.config();

class App {
    public app: express.Application;
    public port: number;
    private server: HTTPServer;
    protected webSocketHandler: WebSocketHandler;

    constructor(controllers: Controller[], port: number) {
        this.app = express();
        this.port = port;
        this.server = createServer(this.app);
        this.webSocketHandler = new WebSocketHandler(this.server);
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddlewares() {
        this.app.use(middlewares);
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    private async connectToDatabase() {
        try {
            const { LOCAL_DATABASE_URL } = process.env;
            await mongoose.connect(LOCAL_DATABASE_URL as string);
            console.log('Connected to the database! (•‿•)');
        } catch (error) {
            console.log('Error during connection! (✖╭╮✖)', error);
        }
    }


    public listen() {
        this.server.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;
