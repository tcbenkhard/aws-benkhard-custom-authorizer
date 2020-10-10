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
const handler_utils_1 = require("./util/handler-utils");
const user_service_1 = require("./service/user-service");
const userService = new user_service_1.UserService();
const handle = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const userRegistration = JSON.parse(event.body);
    const user = yield userService.registerUser(userRegistration);
    return {
        statusCode: 201,
        body: JSON.stringify({ email: user.email })
    };
});
exports.handler = handler_utils_1.wrapHandler(handle);
