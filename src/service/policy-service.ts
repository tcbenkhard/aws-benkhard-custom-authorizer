import {APIGatewayProxyEvent, APIGatewayTokenAuthorizerEvent} from "aws-lambda";

export class PolicyService {
    public generateAllow(token, event: APIGatewayTokenAuthorizerEvent) {
        return {
            "principalId": `${token.email}`,
            "policyDocument": {
                "Version": "2012-10-17",
                "Statement": [
                    {
                        "Action": "execute-api:Invoke",
                        "Effect": "Allow",
                        "Resource": `${event.methodArn}`
                    }
                ]
            }
        }
    }

    public generateDeny(event: APIGatewayTokenAuthorizerEvent) {
        return {
            "principalId": ``,
            "policyDocument": {
                "Version": "2012-10-17",
                "Statement": [
                    {
                        "Action": "execute-api:Invoke",
                        "Effect": "Deny",
                        "Resource": `${event.methodArn}`
                    }
                ]
            }
        }
    }
}