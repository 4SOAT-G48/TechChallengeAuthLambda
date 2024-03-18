import { APIGatewayProxyEventBase, APIGatewayProxyResult } from 'aws-lambda';
import sendResponse from '../utils/api';
import formatUserAttributes from '../utils/formatUserAttributes';
import { awsConfig, cognito } from '../constants';

interface LoginEvent { 
    body: string;
}

export async function login(event: APIGatewayProxyEventBase<LoginEvent>): Promise<APIGatewayProxyResult> {
    try {
        const { cpf, password } = JSON.parse(event.body);

        const response = await cognito
            .adminInitiateAuth({
                AuthFlow: "ADMIN_NO_SRP_AUTH",
                UserPoolId: awsConfig.USER_POOL,
                ClientId: awsConfig.USER_POOL_CLIENT,
                AuthParameters: {
                    USERNAME: cpf,
                    PASSWORD: password,
                },
            })
            .promise();

        const data = await cognito
            .getUser({
                AccessToken: response.AuthenticationResult.AccessToken,
            })
            .promise();

        return sendResponse(200, {
            ...formatUserAttributes(data.UserAttributes),
            ...response.AuthenticationResult,
            statusCode: 200,
        });
    } catch (error) {
        console.error(error);
        return sendResponse(400, error);
    }
};