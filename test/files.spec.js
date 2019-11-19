const chai = require('chai');
const chaiHttp = require('chai-http');
const tags = require('mocha-tags');
const { ApiGatewayUrl, S3Bucket, S3BucketUrl } = require('../config/aws.json');
const auth = require('../src/auth');
const { loadBucket } = require('../src/helpers/aws-s3-files');

const should = chai.should();
should.should.have.property('fail');

chai.use(chaiHttp);

let files;

tags('files', 's3', 'express', 'app')
  .describe('S3 files loader', () => {
    it('returns a list of files using default api', async () => {
      const { authToken } = await auth;
      files = await loadBucket(ApiGatewayUrl, authToken, S3Bucket);
      /* eslint-disable no-unused-expressions */
      files.should.be.an('array').that.is.not.empty;
      files.forEach((file) => {
        file.should.be.an('object').that.is.not.empty;
        file.should.have.property('downloadURL').that.is.a.string;
      });
      /* eslint-enable no-unused-expressions */
    });

    it('file links are valid', () => {
      files.forEach(async (file) => {
        file.downloadURL.should.contain(S3BucketUrl);
        file.downloadURL.should.contain(file.Key);
        const path = file.downloadURL.split('/')[3];
        const download = await chai.request(S3BucketUrl).get(`/${path}`);

        download.status.should.be.equal(200);
      });
    });
  });
