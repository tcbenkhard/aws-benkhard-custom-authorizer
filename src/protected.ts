import {APIGatewayProxyResult} from "aws-lambda";

const handle = async (): Promise<APIGatewayProxyResult> => {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'It worked!' })
    }
}

export const handler = handle;