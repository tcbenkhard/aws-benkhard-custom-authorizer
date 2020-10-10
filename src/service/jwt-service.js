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
exports.JwtService = void 0;
const jwt = require("jsonwebtoken");
const moment = require("moment");
const token_repository_1 = require("../repository/token-repository");
const uuid_1 = require("uuid");
const crypto = require("crypto");
const unauthorized_error_1 = require("../model/exceptions/unauthorized-error");
class JwtService {
    constructor() {
        this.tokenRepository = new token_repository_1.TokenRepository();
    }
    createWebToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const secret = this.generateSecret(user);
            yield this.tokenRepository.create(secret);
            return this.sign(user, secret);
        });
    }
    sign(user, secret) {
        const now = moment();
        const expirationDate = now.add(30, 'm');
        const token = jwt.sign({ email: user.email }, secret.secret, { expiresIn: '24h', issuer: JwtService.ISSUER, algorithm: "HS256", keyid: secret.tid });
        return {
            token,
            issuedAt: now.unix(),
            expiresAt: expirationDate.unix()
        };
    }
    generateSecret(user) {
        return {
            tid: uuid_1.v4(),
            secret: crypto.randomBytes(128).toString('hex')
        };
    }
    validate(authorizationToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const decodedToken = jwt.decode(authorizationToken, { complete: true });
            if (decodedToken.header) {
                const secret = yield this.tokenRepository.find(decodedToken.header.kid);
                if (secret) {
                    try {
                        const token = jwt.verify(authorizationToken, secret.secret);
                        return token;
                    }
                    catch (exception) {
                        console.log(`Exception validating token: ${exception}`);
                        throw new unauthorized_error_1.UnauthorizedError([{ errorCode: 'UNAUTHORIZED', reason: 'Invalid token.' }]);
                    }
                }
            }
            throw Error('Unauthorized');
        });
    }
}
exports.JwtService = JwtService;
JwtService.ISSUER = 'benkhard-authorizer';
