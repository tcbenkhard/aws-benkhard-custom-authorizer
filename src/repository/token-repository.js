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
exports.TokenRepository = void 0;
const AWS = require("aws-sdk");
class TokenRepository {
    constructor() {
        this.client = new AWS.DynamoDB.DocumentClient();
    }
    create(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.client.put({
                TableName: process.env.TOKENS_TABLE,
                Item: token
            }).promise();
            return token;
        });
    }
    find(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.client.get({
                TableName: process.env.TOKENS_TABLE,
                Key: {
                    'tid': tid
                }
            }).promise();
            return result.Item;
        });
    }
}
exports.TokenRepository = TokenRepository;
