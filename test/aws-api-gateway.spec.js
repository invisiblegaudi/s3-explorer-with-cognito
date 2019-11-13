const chai = require('chai');
const chaiHttp = require('chai-http');
const tags = require('mocha-tags');
const { ApiGatewayUrl, S3Bucket } = require('../config/aws.json');
const auth = require('../src/auth');

const should = chai.should();
should.should.have.property('fail');

chai.use(chaiHttp);

let response;
let gateway;

tags('aws', 'auth', 'api')
  .describe('AWS API', () => {
    it('is running', async () => {

      response = await chai
        .request(ApiGatewayUrl)
        .get('');

      response.should.have.property('status', 500);
    });

    it('responds with access token', async () => {
      response = await auth;
      response.should.be.have.property('accessToken');
    });

    it('allows access to lambda endpoint', async () => {
      const { accessToken } = response;
      gateway = await chai.request(ApiGatewayUrl)
        .get(`/${S3Bucket}`)
        .set('Authorization', accessToken);
      gateway.status.should.be.equal(200);
    });

    it('returns signed url for bucket access', () => {
      gateway.body.should.contain(`https://${S3Bucket}`);
    });
  });
