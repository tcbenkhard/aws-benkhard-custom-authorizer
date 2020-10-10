export abstract class ApiError {
    statusCode: number;
    body: string;

    constructor(statusCode: number, details: ErrorDetail[]) {
        this.statusCode = statusCode;
        this.body = JSON.stringify(details);
    }
}

export interface ErrorDetail {
    errorCode: string;
    reason: string;
}