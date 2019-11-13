const chai = require('chai');
const chaiHttp = require('chai-http');
const tags = require('mocha-tags');
const app = require('../src/index');

const should = chai.should();
should.should.have.property('fail');

chai.use(chaiHttp);

let homepage;

tags('express', 'app', 'backend')
  .describe('Express App', () => {
    it('is running', async () => {
      homepage = await chai
        .request(app)
        .get('/');
    });

    it('is rendering the template', () => {
      homepage.body.should.not.be.empty;
      homepage.body.should.contain('<head>');
      homepage.body.should.contain('<body>');
    });
  });
