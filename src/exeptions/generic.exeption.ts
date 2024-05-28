import HttpException from "./http.exeption";

class GenericHttpException extends HttpException {
    constructor(status: number, message: string) {
        super(status, message);
    }
}

export default GenericHttpException;