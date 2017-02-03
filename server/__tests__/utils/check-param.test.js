'use strict';
/*

  Parameter Checking Middleware Tests

*/
const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const middleware = require('../../utils/check-param');

let request = {};
let response = {};

describe('Check Parameter Middleware', ()=>{
  beforeEach((done)=>{
    /*
     * before each test, reset the request and response variables
     * to be send into the middle ware
    **/
    request = httpMocks.createRequest({
        method: 'GET',
        url: '/test/path?myid=312',
        query: {
            myid: '312'
        }
    });
    response = httpMocks.createResponse();

    done(); // call done so that the next test can run
  });
  it('should not return an error', (done) =>{
    middleware([])(request, response, function next(error) {
      if (error) { throw error }
      done(); // call done so we can run the next test
    });
  });
  it('should not have an error when all parameters are present', (done)=>{
    const params = {message:'Hi', rates: 2};
    request.body = params;
    middleware(['message', 'rates'])(request, response, function next(error) {
      if (error) { throw error }
      done(); // call done so we can run the next test
    });
  });
  it('should have an error when all parameters are present', (done)=>{
    const params = {message:'Hi'};
    request.body = params;
    middleware(['message', 'rates'])(request, response, function next(error) {
      expect(error).to.be.ok;
      expect(response.statusCode).to.equal(400);
      done(); // call done so we can run the next test
    });
  });
});
