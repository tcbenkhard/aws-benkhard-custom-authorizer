import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {JwtService} from "./service/jwt-service";
import {UserService} from "./service/user-service";
import {wrapHandler} from "./util/handler-utils";

const userService = new UserService();
const jwtService = new JwtService();

const handle = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const authHeader = event.headers.Authorization;
    const user = await userService.verifyUserLogin(authHeader);
    const jwt = await jwtService.createWebToken(user);

    return {
        statusCode: 200,
        body: JSON.stringify(jwt)
    }
}

export const handler = wrapHandler(handle);