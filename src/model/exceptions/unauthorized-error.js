"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const api_error_1 = require("./api-error");
class UnauthorizedError extends api_error_1.ApiError {
    constructor(details) {
        super(401, details);
    }
}
exports.UnauthorizedError = UnauthorizedError;
