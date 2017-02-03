/*
  Parameter Checking Middleware
*/
'use strict';

module.exports = (params) => {
  return (req, res, next) => {
    if(!req.body) {
      res.status(400);
      next(new Error('No Body.'));
    } else {
      for(let param of params) {
        if(!req.body[param]) {
          res.status(400);
          next(new Error('No '+param+' in body.'));
          return;
        }
      }
      next();
    }

  }
}
