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
const policy_service_1 = require("./service/policy-service");
const handler_utils_1 = require("./util/handler-utils");
const jwtService = new jwt_service_1.JwtService();
const policyService = new policy_service_1.PolicyService();
const handle = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validJwt = yield jwtService.validate(event.authorizationToken.substr('Bearer '.length));
        const policy = policyService.generateAllow(validJwt, event);
        return policy;
    }
    catch (exception) {
        throw new Error("Unauthorized");
    }
});
exports.handler = handler_utils_1.wrapHandler(handle);
