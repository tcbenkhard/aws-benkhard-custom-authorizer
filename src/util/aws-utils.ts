import {DocumentClient} from "aws-sdk/clients/dynamodb";
import * as AWS from 'aws-sdk';

export default class AwsUtils {
    public static dynamo(): DocumentClient {
        return new AWS.DynamoDB.DocumentClient();
    }
}