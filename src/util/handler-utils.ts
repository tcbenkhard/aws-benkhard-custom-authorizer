import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {ApiError} from "../model/exceptions/api-error";
import {ServerError} from "../model/exceptions/server-error";

export const wrapHandler = (lambdaFunction) => async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        return await lambdaFunction(event);
    } catch(exception) {
        console.log('Caught an exception:', exception);
        if(exception instanceof ApiError) {
            return exception;
        } else {
            return new ServerError();
        }
    }
}