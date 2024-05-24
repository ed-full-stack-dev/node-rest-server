import express from 'express';
import storeService from '../services/store.service';


class ApiV1Controller {
  public path = '/api/v1';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(`${this.path}/:collection`, this.getAll);
    this.router.get(`${this.path}/:collection/:id`, this.getById);
    this.router.post(`${this.path}/:collection`, this.create);
    this.router.patch(`${this.path}/:collection/:id`, this.update);
    this.router.delete(`${this.path}/:collection/:id`, this.delete);
  }

  getById = async (request: express.Request, response: express.Response) => {
    const collection = request.params.collection;
    const id = request.params.id;
    let data;

    switch (collection) {
      case 'users':
        data = await storeService.Users.findById(id, '-password')
        break;
      case 'companies':
        data = await storeService.Companies.findById(id);
        break;
      // handle other collections...
      default:
        return response.status(400).send({ error: 'Invalid collection' });
    }

    if (!data) {
      return response.status(404).send({ error: 'Document not found' });
    }

    response.status(200).send(data);
  }

  getAll = async (request: express.Request, response: express.Response) => {
    const collection = request.params.collection;
    let data;

    switch (collection) {
      case 'users':
        data = await storeService.Users.find();
        break;
      case 'companies':
        data = await storeService.Companies.find();
        break;
      // handle other collections...
      default:
        return response.status(400).send({ error: 'Invalid collection' });
    }

    response.status(200).send(data);
  };

  create = async (request: express.Request, response: express.Response) => {
    const collection = request.params.collection;
    const body = request.body;
    let data;

    switch (collection) {
      case 'users':
        data = await storeService.Users.create(body);
        break;
      case 'companies':
        data = await storeService.Companies.create(body);
        break;
      // handle other collections...
      default:
        return response.status(400).send({ error: 'Invalid collection' });
    }

    response.status(200).send(data);
  };

  update = async (request: express.Request, response: express.Response) => {
    const collection = request.params.collection;
    const id = request.params.id;
    const body = request.body;
    let data;

    switch (collection) {
      case 'users':
        data = await storeService.Users.findByIdAndUpdate(id, body, { new: true });
        break;
      case 'companies':
        data = await storeService.Companies.findByIdAndUpdate(id, body, { new: true });
        break;
      // handle other collections...
      default:
        return response.status(400).send({ error: 'Invalid collection' });
    }

    if (!data) {
      return response.status(404).send({ error: 'Document not found' });
    }

    response.status(200).send(data);
  };

  delete = async (request: express.Request, response: express.Response) => {
    const collection = request.params.collection;
    const id = request.params.id;
    let data;

    switch (collection) {
      case 'users':
        data = await storeService.Users.findByIdAndDelete(id);
        break;
      case 'companies':
        data = await storeService.Companies.findByIdAndDelete(id);
        break;
      // handle other collections...
      default:
        return response.status(400).send({ error: 'Invalid collection' });
    }

    if (!data) {
      return response.status(404).send({ error: 'Document not found' });
    }

    response.send({ message: 'Document deleted' });
  };
}

export default ApiV1Controller;