"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyService = void 0;
class PolicyService {
    generateAllow(token, event) {
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
        };
    }
    generateDeny(event) {
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
        };
    }
}
exports.PolicyService = PolicyService;
