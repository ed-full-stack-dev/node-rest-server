import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import storeService from '../services/store.service';
import User from '../interfaces/user.interace';
import GenericHttpException from '../exeptions/generic.exeption';
interface RequestWithUser extends Request {
    user?: User;
}
async function authenticationMiddleware(request: RequestWithUser, _response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if (!authorization) {
        next(new GenericHttpException(401, 'No token provided'));
        return;
    }

    const token = authorization.split(' ')[1];
    const secret = process.env.JWT_SECRET as string;

    try {
        const verificationResponse = jwt.verify(token, secret) as {id: string};
        const user = await storeService.Users.findById(verificationResponse.id);

        if (user) {
            request.user = user;
            next();
        } else {
            next(new GenericHttpException(401, 'Wrong authentication token'));
        }
    } catch (error) {
        next(new GenericHttpException(401, 'Wrong authentication token'));
    }
    
}

export default authenticationMiddleware;

 
