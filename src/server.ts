import App from "./app";
import UsersController from "./controllers/users.controller";
import ApiV1Controller from "./controllers/api-v1.controller";
import WelcomeController from "./controllers/welcome.controller";
import AuthenticationController from "./controllers/authentication.controller";
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 5000;
const app = new App([new UsersController(), new ApiV1Controller(), new AuthenticationController(), new WelcomeController()], parseInt(port as string));
app.listen();