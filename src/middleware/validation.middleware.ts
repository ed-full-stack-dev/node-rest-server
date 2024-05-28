import { RequestHandler } from "express";
import { validate } from "class-validator";
import GenericHttpException from "../exeptions/generic.exeption";
import { plainToInstance } from "class-transformer";


function validationMiddleware<T>(type: new () => T, skipMissingProperties: boolean = false): RequestHandler {
    return (req, _res, next) => {
        const objectInstance = plainToInstance(type, req.body) as object;
        validate(objectInstance, { skipMissingProperties })
            .then(errors => {
                if (errors.length > 0) {
                    next(new GenericHttpException(400, 'Validation failed'));
                } else {
                    next();
                }
            })
            .catch(err => {
                console.log('Catch error', err);
                next(err)
            });
    };
}

export default validationMiddleware;