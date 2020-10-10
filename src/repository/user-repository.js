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
exports.UserRepository = void 0;
const AWS = require("aws-sdk");
class UserRepository {
    constructor() {
        this.client = new AWS.DynamoDB.DocumentClient();
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.client.put({
                TableName: process.env.USERS_TABLE,
                Item: user,
                ConditionExpression: 'attribute_not_exists(email)'
            }).promise();
            return user;
        });
    }
    find(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.client.get({
                TableName: process.env.USERS_TABLE,
                Key: {
                    'email': email
                }
            }).promise();
            return result.Item;
        });
    }
}
exports.UserRepository = UserRepository;
