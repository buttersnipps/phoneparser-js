var chai = require('chai');
var expect = require('chai').expect;
var fs = require('fs');

chai.use(require('chai-http'));

var app = require('./server.js');

describe('API endpoint /', () => {

  // GET - root
  it('root should return status 200', () => {
    return chai.request(app)
      .get('/')
      .then((res) => {
        expect(res).to.have.status(200);
        });
  });
});

describe('API endpoint /api/phonenumbers/parse/text', () => {

// GET - number
it('should return [\'+1 416-491-5050\']', () => {
    return chai.request(app)
      .get('/api/phonenumbers/parse/text/Seneca%20Phone%20Number%3A%20416-491-5050')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array').that.include('+1 416-491-5050');
      });
  });

// GET - nothing -- TODO
/*
it('should return an empty array', () => {
    return chai.request(app)
    .get('/api/phonenumbers/parse/text/nothing')
    .then((res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('array').that.is.empty;
    });
  });
*/

});


describe('API endpoint /api/phonenumbers/parse/file', () => {

  // POST - file
  it('should return [\'+1 859-999-1843\', \'+1 316-984-6123\', \'+1 321-342-6332\']', () => {
      return chai.request(app)
        .post('/api/phonenumbers/parse/file')
        .set('Content-Type', 'text/plain')
        .attach('file', fs.readFileSync('./numbers.txt'), 'numbers.txt')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array').that.include('+1 859-999-1843', '+1 316-984-6123', '+1 321-342-6332');
       });
     })
});
