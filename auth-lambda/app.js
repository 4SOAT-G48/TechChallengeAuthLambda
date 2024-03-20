import { APIGatewayProxyEventBase, APIGatewayProxyResult } from 'aws-lambda';
import sendResponse from '../utils/api';
import formatUserAttributes from '../utils/formatUserAttributes';
import { awsConfig, cognito } from '../constants';

/**
 * Handles user login by initiating authentication with Amazon Cognito.
 * @param {APIGatewayProxyEventBase<LoginEvent>} event - API Gateway Lambda Proxy Input Event
 * @returns {Promise<APIGatewayProxyResult>} - API Gateway Lambda Proxy Output Response
 */
export async function login(event) {
    try {
        const { cpf, password } = JSON.parse(event.body);

        // Initiate authentication with Cognito
        const response = await cognito.adminInitiateAuth({
            AuthFlow: "ADMIN_NO_SRP_AUTH",
            UserPoolId: awsConfig.USER_POOL,
            ClientId: awsConfig.USER_POOL_CLIENT,
            AuthParameters: {
                USERNAME: cpf,
                PASSWORD: password,
            },
        }).promise();

        // Retrieve user information
        const data = await cognito.getUser({
            AccessToken: response.AuthenticationResult.AccessToken,
        }).promise();

        // Format user attributes and authentication result
        const formattedResponse = {
            ...formatUserAttributes(data.UserAttributes),
            ...response.AuthenticationResult,
            statusCode: 200,
        };

        // Send successful response
        return sendResponse(200, formattedResponse);
    } catch (error) {
        // Handle errors
        console.error(error);
        return sendResponse(400, error);
    }
}
