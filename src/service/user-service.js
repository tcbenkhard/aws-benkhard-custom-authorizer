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
exports.UserService = void 0;
const unauthorized_error_1 = require("../model/exceptions/unauthorized-error");
const crypto_utils_1 = require("../util/crypto-utils");
const user_repository_1 = require("../repository/user-repository");
class UserService {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
        this.SALT_LENGTH = 10;
    }
    verifyUserLogin(encodedAuthHeader) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!encodedAuthHeader)
                throw new unauthorized_error_1.UnauthorizedError([{ errorCode: 'UNAUTHORIZED', reason: 'Authorization header is missing in the request.' }]);
            const parsedHeader = crypto_utils_1.default.parseBasicAuthorizationHeader(encodedAuthHeader);
            const user = yield this.userRepository.find(parsedHeader.email);
            this.validatePassword(parsedHeader.password, user);
            return user;
        });
    }
    registerUser(userRegistration) {
        return __awaiter(this, void 0, void 0, function* () {
            const generatedSalt = crypto_utils_1.default.generateSalt(this.SALT_LENGTH);
            const result = yield this.userRepository.create({
                email: userRegistration.email,
                salt: generatedSalt,
                hash: crypto_utils_1.default.hash(userRegistration.password, generatedSalt)
            });
            return result;
        });
    }
    validatePassword(providedPassword, user) {
        if (!user || user.hash !== crypto_utils_1.default.hash(providedPassword, user.salt)) {
            throw new unauthorized_error_1.UnauthorizedError([{ errorCode: 'UNAUTHORIZED', reason: 'Invalid user or password.' }]);
        }
    }
}
exports.UserService = UserService;
