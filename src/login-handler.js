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
exports.handler = void 0;
const jwt_service_1 = require("./service/jwt-service");
const user_service_1 = require("./service/user-service");
const handler_utils_1 = require("./util/handler-utils");
const userService = new user_service_1.UserService();
const jwtService = new jwt_service_1.JwtService();
const handle = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = event.headers.Authorization;
    const user = yield userService.verifyUserLogin(authHeader);
    const jwt = yield jwtService.createWebToken(user);
    return {
        statusCode: 200,
        body: JSON.stringify(jwt)
    };
});
exports.handler = handler_utils_1.wrapHandler(handle);
