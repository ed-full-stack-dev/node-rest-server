import cors from 'cors';
import { Secret } from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { expressjwt } from 'express-jwt';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const jwtOptions: {
  secret: Secret;
  algorithms: jwt.Algorithm[];
  credentialsRequired: boolean;
} = {
  secret: process.env.JWT_SECRET as string,
  algorithms: ['HS256'],
  credentialsRequired: false,
};
const corsOptions: cors.CorsOptions = {
  credentials: true,
  origin: [
    process.env.LOCAL_HOST as string,
    process.env.CLIENT_HOST as string,
  ],
};

const middlewares: RequestHandler[] = [
  bodyParser.json(),
  cookieParser(),
  cors(corsOptions),
  expressjwt(jwtOptions),
];


export default middlewares;