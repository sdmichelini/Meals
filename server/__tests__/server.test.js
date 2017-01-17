'use strict';
const expect = require('chai').expect;
const request = require('superagent');

describe('Health Test',()=>{
  describe('GET /api/health', ()=>{
    it('should succeed w/ OK message', (done)=>{
      request.get('http://localhost:3001/api/health')
        .end((err, res) => {
          expect(err).to.not.be.ok;
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('OK.');
          done();
        });
    });
    it('should get a 404 on bad API route', (done)=>{
      request.get('http://localhost:3001/api/jdjje')
        .end((err, res) => {
          expect(err).to.be.ok;
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.be.an('array');
          expect(res.body.errors[0]).to.have.property('msg');
          expect(res.body.errors[0].msg).to.equal('Error: Not Found');
          done();
        });
    });
  });
});
