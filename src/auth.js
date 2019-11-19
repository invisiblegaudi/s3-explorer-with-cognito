const { authenticateUser } = require('./helpers/aws-cognito');
const { user1 } = require('../config/users.json');
const { UserPoolId, ClientId, ApiGatewayUrl } = require('../config/aws.json');

const defaultApiGateway = (...args) => authenticateUser(user1, ...args);
const defaultAuth = defaultApiGateway(UserPoolId, ClientId, ApiGatewayUrl);

module.exports = defaultAuth;
