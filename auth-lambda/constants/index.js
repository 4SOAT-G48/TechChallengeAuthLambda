import { CognitoIdentityServiceProvider as _CognitoIdentityServiceProvider } from 'aws-sdk';

const awsConfig = {
    USER_POOL: process.env.IS_OFFLINE ? "us-east-1_mockedData" : process.env.USER_POOL,
    USER_POOL_CLIENT: process.env.IS_OFFLINE ? "anothermock" : process.env.USER_POOL_CLIENT,
};

const cognito = new _CognitoIdentityServiceProvider();

export default { awsConfig, cognito };
