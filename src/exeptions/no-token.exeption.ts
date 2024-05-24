import HttpException from "./http.exeption";

export default class NoTokenException extends HttpException {
    constructor() {
        super(401, 'No token provided');
    }
}