import * as AWS from "aws-sdk";

export class TokenRepository {
    private client = new AWS.DynamoDB.DocumentClient();

    public async create(token: Token) {
        const result = await this.client.put({
            TableName: process.env.TOKENS_TABLE,
            Item: token
        }).promise();

        return token;
    }

    public async find(tid: string): Promise<Token> {
        const result = await this.client.get({
            TableName: process.env.TOKENS_TABLE,
            Key: {
                'tid': tid
            }
        }).promise();

        return result.Item as Token;
    }
}

export interface Token {
    tid: string;
    secret: string;
}