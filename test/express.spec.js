const chai = require('chai');
const chaiHttp = require('chai-http');
const tags = require('mocha-tags');
const app = require('../src/index');

const should = chai.should();
should.should.have.property('fail');

chai.use(chaiHttp);

tags('express', 'app', 'backend')
  .describe('Express App', () => {
    it('is running', async () => {
     chai.request(app)
        .get('/');
    });
  });

