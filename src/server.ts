import App from "./app";
import UsersController from "./controllers/users.controller";
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 5000;
const app = new App([new UsersController()], parseInt(port as string));
app.listen();