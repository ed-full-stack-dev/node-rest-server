import express from 'express';
import * as bcrypt from 'bcrypt';
import UserDTO from '../DTO/user.dto';
import Controller from '../interfaces/controller.interface';
import jwt from 'jsonwebtoken';
import storeService from '../services/store.service';
import validationMiddleware from '../middleware/validation.middleware';
import dotenv from 'dotenv';
import GenericHttpException from '../exeptions/generic.exeption';
import loginDTO from '../DTO/login.dto';
dotenv.config();


class AuthenticationController implements Controller {
    public path = '/auth';
    public router = express.Router();
    private user = storeService.Users;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, validationMiddleware(UserDTO), this.register);
        this.router.post(`${this.path}/login`, validationMiddleware(loginDTO), this.login);
        this.router.post(`${this.path}/logout`, this.logout);
    }

    private register = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const userData: UserDTO = request.body;
        const userExists = await this.user.findOne({ email: userData.email });
        if (userExists) {
            next(new GenericHttpException(400, 'User already exists'));
        }
        else {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const user = await this.user.create({ ...userData, password: hashedPassword },);
            const createdUser = { ...user.toObject() };
            const { id } = createdUser;
            const tokenData = this.createToken(id);
            response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
            response
            .status(201)
            .send({ 
                success: true,
                token: tokenData.token,
             });
        }

    }
    private login = async (request: express.Request, response: express.Response, next: express.NextFunction) => { 
        const loginData: loginDTO = request.body;
        const user = await this.user.findOne({ email: loginData.email });
        if (user) {
            const isPasswordMatching = await bcrypt.compare(loginData.password, user.password);
            if (isPasswordMatching) {
                const tokenData = this.createToken(user.id);
                response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
                response
                .status(200)
                .send({
                    success: true,
                    token: tokenData.token,
                });
            } else {
                next(new GenericHttpException(400, 'Wrong credentials provided'));
            }
        } else {
            next(new GenericHttpException(400, 'Wrong credentials provided'));
        }
    }
    private logout = async (_request: express.Request, response: express.Response, _next: express.NextFunction) => {
        response.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
        response.status(200).send({
            message: 'Logged out',
        });
    }
    private createToken(userId: string) {
        const expiresIn = 60 * 60; // an hour
        const secret = process.env.JWT_SECRET as string;
        const dataStoredInToken = {
            id: userId,
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
    }

    private createCookie(tokenData: { token: string; expiresIn: number }) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
}

export default AuthenticationController;