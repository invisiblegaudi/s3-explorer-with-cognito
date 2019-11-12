const chai = require('chai');
const chaiHttp = require('chai-http');
const tags = require('mocha-tags');
const { user1, user2 } = require('../config/users.json');
const { UserPoolId, ClientId, ApiGatewayUrl } = require('../config/aws.json');
global.fetch = require('node-fetch')
const { CognitoUserPool, CognitoUser, AuthenticationDetails } = require('amazon-cognito-identity-js');

let success, failure;

const result = new Promise((resolve, reject) => {
  success = resolve;
  failure = reject;
});

const onFailure = (...args) => {
  const [ message ] = [ ...args ];
  if(message) {
    failure(message);
  }
}

const onSuccess = (...args) => {
  const [ message ] = [ ...args ];
  if(message) {
    // console.log(message);
    success(message);
  }
}

const cogitoResponse = {
  onSuccess,
  onFailure,
  newPasswordRequired,
}

const should = chai.should();
chai.use(chaiHttp);

tags('aws', 'auth', 'api')
  .describe('cognito user auth process', () => {
    it('is running', async () => {

      const response = await chai
            .request(ApiGatewayUrl)
            .get('');

      response.should.have.property('status', 500)
    });

    it('sends credentials', async () => {

      cognitoUser.authenticateUser(authenticationDetails, cogitoResponse);
      const response = await result;
      response.should.be.have.property('accessToken');
    });
  });
