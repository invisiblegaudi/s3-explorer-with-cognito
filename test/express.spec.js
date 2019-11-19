const chai = require('chai');
const chaiHttp = require('chai-http');
const tags = require('mocha-tags');
const app = require('../src/index');
const { S3Bucket } = require('../config/aws.json');

const should = chai.should();
should.should.have.property('fail');

chai.use(chaiHttp);

let response;
let page;

tags('express', 'app', 'backend')
  .describe('Express App', () => {
    it('is running', async () => {
      response = await chai
        .request(app)
        .get('/');
      response.status.should.equal(200);
    });

    it('is rendering the homepage template', () => {
      response.type.should.be.equal('text/html');
      page = response.text;
      /* eslint-disable no-unused-expressions */
      page.should.not.be.empty;
      /* eslint-enable no-unused-expressions */
      page.should.contain('<head>');
      page.should.contain('<body>');
    });

    it('loads bucket from url', async () => {
      response = await chai
        .request(app)
        .get(`/${S3Bucket}`);
      response.status.should.equal(200);
      page = response.text;
      /* eslint-disable no-unused-expressions */
      page.should.not.be.empty;
      /* eslint-enable no-unused-expressions */
      page.should.contain('<head>');
      page.should.contain('<body>');
      page.should.contain('<ul>');
      page.should.contain('<li>');
    });
  });
