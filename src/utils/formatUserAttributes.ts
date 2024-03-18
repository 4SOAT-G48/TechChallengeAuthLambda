import { AttributeListType } from "aws-sdk/clients/cognitoidentityserviceprovider";

const formatUserAttributes = (attributes: AttributeListType) => {
  return attributes.reduce((acc, { Name, Value }) => {
      return { ...acc, [Name]: Value };
  }, {});
};

export default formatUserAttributes; 