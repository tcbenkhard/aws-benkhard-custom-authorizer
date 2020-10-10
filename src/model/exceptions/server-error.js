"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
const api_error_1 = require("./api-error");
class ServerError extends api_error_1.ApiError {
    constructor() {
        super(500, [{ errorCode: 'SERVER_ERROR', reason: 'An unexpected server error occured.' }]);
    }
}
exports.ServerError = ServerError;
