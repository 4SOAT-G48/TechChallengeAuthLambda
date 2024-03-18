import AWS, { CognitoIdentityServiceProvider } from 'aws-sdk';

interface AWSConfig {
    USER_POOL: string;
    USER_POOL_CLIENT: string; 
}

export const awsConfig: AWSConfig = {
    USER_POOL: process.env.IS_OFFLINE ? "us-east-1_mockedData" : process.env.USER_POOL,
    USER_POOL_CLIENT: process.env.IS_OFFLINE ? "anothermock" : process.env.USER_POOL_CLIENT,
};

export const cognito: CognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
