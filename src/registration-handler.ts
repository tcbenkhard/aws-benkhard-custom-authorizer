import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {wrapHandler} from "./util/handler-utils";
import {UserService} from "./service/user-service";

const userService = new UserService();

const handle = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userRegistration: UserRegistration = JSON.parse(event.body);
    const user = await userService.registerUser(userRegistration);

    return {
        statusCode: 201,
        body: JSON.stringify({email: user.email})
    }
}

export const handler = wrapHandler(handle);

export interface UserRegistration {
    id?: string
    email: string,
    password: string
}