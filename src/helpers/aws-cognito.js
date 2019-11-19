global.fetch = require('node-fetch'); // fetch required for amazon congnito lib

const {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} = require('amazon-cognito-identity-js');

let success;
let failure;

const response = new Promise((resolve, reject) => {
  success = resolve;
  failure = reject;
});

const onFailure = (...args) => {
  const [message] = [...args];
  if (message) {
    failure(message);
  }
};

const onSuccess = (...args) => {
  const [message] = [...args];
  if (message) {
    success(message);
  }
};

const newPasswordRequired = (userAttributes, cognitoUser) => {
  Object.assign(userAttributes, { email: 'email@address.mock' });
  cognitoUser.completeNewPasswordChallenge('bananas', userAttributes, this);
};

const cognitoResponse = {
  onSuccess,
  onFailure,
  newPasswordRequired,
};

const authenticateUser = (user, UserPoolId, ClientId) => {
  const { Username, Password } = user;

  const authDetails = new AuthenticationDetails({
    Username,
    Password,
  });

  const Pool = new CognitoUserPool({
    UserPoolId,
    ClientId,
  });

  const cognito = new CognitoUser({
    Username,
    Pool,
  });

  cognito.authenticateUser(authDetails, cognitoResponse);

  return response;
};

module.exports = {
  authenticateUser,
};
