const chai = require('chai');
const chaiHttp = require('chai-http');
const tags = require('mocha-tags');
const { user1 } = require('../config/users');
const { UserPoolId, ClientId, ApiGatewayUrl } = require('../config/aws');

const should = chai.should();
chai.use(chaiHttp);


tags('aws', 'auth', 'api')
  .describe('cognito user auth process', () => {
    it('is running', async () => {

      const response = await chai
            .request(ApiGatewayUrl)
            .get('');

      response.should.have.property('status',500)
    });

  });
