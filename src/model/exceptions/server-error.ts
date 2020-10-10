import {ApiError} from "./api-error";

export class ServerError extends ApiError {

    constructor() {
        super(500, [{errorCode: 'SERVER_ERROR', reason: 'An unexpected server error occured.'}]);
    }
}