const chai = require('chai');
const chaiHttp = require('chai-http');
const tags = require('mocha-tags');
const { ApiGatewayUrl } = require('../config/aws.json');
const auth = require('../src/auth');

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

    it('authenticates default user on default AWS gateway API', async () => {
      const response = await auth;
      response.should.be.have.property('accessToken');
    });
  });
