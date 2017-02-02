/*
  Parameter Checking Middleware
*/
'use strict';

module.exports = (params) => {
  return (req, res, next) => {
    if(!req.body) {
      next(new Error('Error: No Body.'));
    } else {
      for(let param of params) {
        if(!req.body[param]) {
          next(new Error('Error: No '+param+' in body.'));
          return;
        }
      }
      next();
    }

  }
}
