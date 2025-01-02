import express  from 'express';
import Controller from './interfaces/controller.interface';
import mongoose from 'mongoose';
import middlewares from './utils/middleware';
import dotenv from 'dotenv';
import errorMiddleware from './middleware/error.middleware';
dotenv.config();
mongoose.set('strictQuery', false);
class App {
    public app: express.Application;
    public port: number;
    constructor(controllers: Controller[], port: number) {
        this.app = express();
        this.port = port;
        this.connectToDatabase();
        this.initializeMiddewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddewares() {
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
        this.app.listen(this.port, () => {
            console.log(`App listening on the port http://localhost:${this.port}`);
        });
    }
}

export default App;