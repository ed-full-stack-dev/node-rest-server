import express from 'express';

class WelcomeController {
    public path = '/';
    public router = express.Router();
   
    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(`${this.path}`, this.welcome);
    }

    welcome = (_request: express.Request, response: express.Response) => {
        response.send('Welcome to the API');
    }
}

export default WelcomeController;