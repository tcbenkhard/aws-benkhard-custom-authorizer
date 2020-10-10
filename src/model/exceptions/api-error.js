"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError {
    constructor(statusCode, details) {
        this.statusCode = statusCode;
        this.body = JSON.stringify(details);
    }
}
exports.ApiError = ApiError;
