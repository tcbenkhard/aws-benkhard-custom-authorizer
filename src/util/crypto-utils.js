"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const js_base64_1 = require("js-base64");
class CryptoUtils {
    static generateSalt(length) {
        return crypto.randomBytes(length)
            .toString('hex') /** convert to hexadecimal format */
            .slice(0, length); /** return required number of characters */
    }
    static hash(password, salt) {
        const hash = crypto.createHmac('sha512', salt);
        hash.update(password);
        return hash.digest('hex');
    }
    ;
    static parseBasicAuthorizationHeader(authHeader) {
        const decodedHeader = js_base64_1.decode(authHeader.substr('Basic '.length));
        const headerValues = decodedHeader.split(':');
        return {
            email: headerValues[0],
            password: headerValues[1]
        };
    }
}
exports.default = CryptoUtils;
