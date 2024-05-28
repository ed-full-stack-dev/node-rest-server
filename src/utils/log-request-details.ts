import express from "express";

const logRequestDetails = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    console.log(`[${request.method}]: ${request.originalUrl}  [${new Date().getTime()}]`);
    next();
}

export default logRequestDetails;