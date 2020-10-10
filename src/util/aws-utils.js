"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
class AwsUtils {
    static dynamo() {
        return new AWS.DynamoDB.DocumentClient();
    }
}
exports.default = AwsUtils;
