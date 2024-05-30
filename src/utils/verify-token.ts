import jwt from 'jsonwebtoken';
import {store}  from '../services/store.service';

async function verifyToken(authorization: string, toJson = false) {
    const token = authorization.includes('Bearer') ? authorization.split(' ')[1] : authorization;
    const secret = process.env.JWT_SECRET as string;
    try {
        const verificationResponse = jwt.verify(token, secret) as {id: string};
        const user = await store.users.findById(verificationResponse.id, {toJSON:true, name:1, email:1});
        if (!user) {
            return null;
        }
        return user;
    } catch (error) {
       if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError){
        console.log('error', error.message);
       }
        return null;
    }
}

export default verifyToken;