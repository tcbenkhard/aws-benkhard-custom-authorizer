"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapHandler = void 0;
const api_error_1 = require("../model/exceptions/api-error");
const server_error_1 = require("../model/exceptions/server-error");
exports.wrapHandler = (lambdaFunction) => (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield lambdaFunction(event);
    }
    catch (exception) {
        console.log('Caught an exception:', exception);
        if (exception instanceof api_error_1.ApiError) {
            return exception;
        }
        else {
            return new server_error_1.ServerError();
        }
    }
});
