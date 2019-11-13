const chai = require('chai');
const chaiHttp = require('chai-http');
const tags = require('mocha-tags');
const app = require('../src/index');

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
      page.should.not.be.empty;
      page.should.contain('<head>');
      page.should.contain('<body>');
    });
  });
