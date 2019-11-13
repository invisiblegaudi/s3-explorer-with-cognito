const chai = require('chai');
const chaiHttp = require('chai-http');
const tags = require('mocha-tags');
const fetch = require('node-fetch');
const { ApiGatewayUrl, S3Bucket } = require('../config/aws.json');
const auth = require('../src/auth');

const should = chai.should();
chai.use(chaiHttp);

let response;

tags('aws', 'auth', 'api')
  .describe('AWS API', () => {
    it('is running', async () => {

      response = await chai
            .request(ApiGatewayUrl)
            .get('');

      response.should.have.property('status', 500)
    });

    it('responds with access token', async () => {
      response = await auth;
      response.should.be.have.property('accessToken');
    });

    it('allows access to lambda endpoint', async () => {
      const { accessToken } = response;
      const gateway = await fetch(ApiGatewayUrl+'/'+S3Bucket, {
        method:'GET',
        referrer: 'no-referrer',
        headers: {
          Authorization: accessToken,
          "Access-Control-Request-Method": "GET",
        }
      });
    })

  });
