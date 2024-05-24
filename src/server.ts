import App from "./app";
import UsersController from "./controllers/users.controller";
import ApiV1Controller from "./controllers/api-v1.controller";
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 5000;
const app = new App([new UsersController(), new ApiV1Controller()], parseInt(port as string));
app.listen();