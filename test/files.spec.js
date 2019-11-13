const chai = require('chai');
const chaiHttp = require('chai-http');
const tags = require('mocha-tags');
const { S3Bucket, S3BucketUrl } = require('../config/aws.json');
const auth = require('../src/auth');
const { initS3Init, loadS3Files } = require('../src/files');

const should = chai.should();
should.should.have.property('fail');

chai.use(chaiHttp);

let files;

tags('files', 's3', 'express', 'app')
  .describe('S3 files loader', () => {
    it('initialises using auth', async () => {
      initS3Init(await auth);
    });

    it('returns a list of files using bucket name', () => {
      files = loadS3Files(S3Bucket);
      files.forEach((file) => {
        file.should.be.an('array').that.is.not.empty;
        file.should.be.an('object').that.is.not.empty;
        file.should.have.property('href').that.is.a.string;
      });
    });

    it('file links are valid', () => {
      files.forEach(async (file) => {
        file.href.should.contain(S3BucketUrl);
        file.href.should.contain(file.Key);
        const path = file.href.split('/')[3];
        const download = await chai
              .request(S3BucketUrl)
              .get(`/${path}`);

        download.status.should.be.equal(200);
      });
    });
  });
