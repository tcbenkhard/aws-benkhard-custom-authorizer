import {ApiError, ErrorDetail} from "./api-error";

export class UnauthorizedError extends ApiError {
    headers: {
        "WWW-Authenticate": "Basic"
    }

    constructor(details: ErrorDetail[]) {
        super(401, details);
    }
}