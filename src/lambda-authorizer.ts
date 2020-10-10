import {APIGatewayAuthorizerResult, APIGatewayProxyResult, APIGatewayTokenAuthorizerEvent} from "aws-lambda";
import {JwtService} from "./service/jwt-service";
import {PolicyService} from "./service/policy-service";
import {wrapHandler} from "./util/handler-utils";

const jwtService = new JwtService();
const policyService = new PolicyService();

const handle = async (event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewayAuthorizerResult|APIGatewayProxyResult> => {
    try {
        const validJwt = await jwtService.validate(event.authorizationToken.substr('Bearer '.length));
        const policy = policyService.generateAllow(validJwt, event);
        return policy;
    } catch (exception) {
        throw new Error("Unauthorized");
    }
}

export const handler = wrapHandler(handle);