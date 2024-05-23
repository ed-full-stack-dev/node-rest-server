import express from 'express';

class UsersController {
  public path = '/users';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.use(this.path, this.logRequestDetails);
    this.router.get(this.path, this.getAllUsers);
  }

  logRequestDetails = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    console.log(`[${request.method}]: ${request.originalUrl}  [${new Date().getTime()}]`);
    next();
};


  getAllUsers = (request: express.Request, response: express.Response) => {
    response.send([
      {
        id: 1,
        name: 'John Doe',
      },
      {
        id: 2,
        name: 'Jane Doe',
      }
    ]);
  };
}

export default UsersController;