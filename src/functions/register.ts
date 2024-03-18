import { APIGatewayProxyEventBase } from 'aws-lambda';
import sendResponse, { ApiResponse } from '../utils/api';
import { awsConfig, cognito } from '../constants';

interface RegisterEvent {
    body: string; 
}


export async function register(event: APIGatewayProxyEventBase<RegisterEvent>): Promise<ApiResponse> {
    try {
        const { cpf, password } = JSON.parse(event.body);

        const result = await cognito
            .adminCreateUser({
                UserPoolId: awsConfig.USER_POOL,
                Username: cpf,
                UserAttributes: [
                    {
                        Name: 'cpf',
                        Value: cpf,
                    },
                    {
                        Name: 'custom:cpf_verified',
                        Value: 'true',
                    },
                ],
                MessageAction: 'SUPPRESS',
            })
            .promise();

        if (result.User) {
            await cognito
                .adminSetUserPassword({
                    Password: password,
                    UserPoolId: awsConfig.USER_POOL,
                    Username: cpf,
                    Permanent: true,
                })
                .promise();
        }

        return sendResponse(200, { result });
    } catch (error) {
        console.error(error);
        return sendResponse(400, error);
    }
};