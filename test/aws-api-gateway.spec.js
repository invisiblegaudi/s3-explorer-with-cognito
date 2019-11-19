const chai = require('chai');
const chaiHttp = require('chai-http');
const tags = require('mocha-tags');
const { ApiGatewayUrl, S3Bucket, S3BucketUrl } = require('../config/aws.json');
const auth = require('../src/auth');

const should = chai.should();
should.should.have.property('fail');

chai.use(chaiHttp);

let response;
let gateway;
let files;

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
      response.should.have.property('accessToken');
    });

    it('allows access to lambda endpoint', async () => {
      const { accessToken } = response;
      gateway = await chai.request(ApiGatewayUrl)
        .get(`/${S3Bucket}`)
        .set('Authorization', accessToken);
      gateway.status.should.be.equal(200);
    });

    it('returns a list of bucket files', () => {
      /* eslint-disable no-unused-expressions */
      files = gateway.body;
      files.should.be.an('array').that.is.not.empty;
      files[0].should.be.an('object').that.is.not.empty;
      files[0].should.have.property('Key').that.is.a.string;
      /* eslint-enable no-unused-expressions */
    });

    it('can download a file', async () => {
      const file = files[0];
      file.should.have.property('downloadURL');
      file.downloadURL.should.contain(S3BucketUrl);
      file.downloadURL.should.contain(file.Key);
      const path = file.downloadURL.split('/')[3];
      const download = await chai.request(S3BucketUrl).get(`/${path}`);
      download.status.should.be.equal(200);
    });
  });
