import { Request, Response, NextFunction } from 'express';
import User from '../interfaces/user.interace';
import GenericHttpException from '../exeptions/generic.exeption';
import verifyToken from '../utils/verify-token';
interface RequestWithUser extends Request {
    user?: User;
}
async function authenticationMiddleware(request: RequestWithUser, _response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if (!authorization) {
        next(new GenericHttpException(401, 'No token provided'));
        return;
    }

    try {
        const user = await verifyToken(authorization, false);
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


