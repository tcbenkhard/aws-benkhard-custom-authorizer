import * as AWS from "aws-sdk";

export class UserRepository {
    private client = new AWS.DynamoDB.DocumentClient();

    public async create(user: User) {
        const result = await this.client.put({
            TableName: process.env.USERS_TABLE,
            Item: user,
            ConditionExpression: 'attribute_not_exists(email)'
        }).promise();

        return user;
    }

    public async find(email: string): Promise<User> {
        const result = await this.client.get({
            TableName: process.env.USERS_TABLE,
            Key: {
                'email': email
            }
        }).promise();

        return result.Item as User;
    }
}

export interface User {
    email: string;
    salt: string;
    hash: string;
}