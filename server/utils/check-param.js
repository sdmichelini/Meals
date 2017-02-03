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
        // Nested Object Inpection
        let periodIndex = param.indexOf('.');
        if(periodIndex === -1) {
          if(!req.body[param]) {
            res.status(400);
            next(new Error('No '+param+' in body.'));
            return;
          }
        } else {
          // Nested Object
          let objects = param.split('.');
          if(objects.length > 2) {
            next(new Error('Nested Object Checking Limited to 2'));
          } else {
            if(!req.body[objects[0]] || !req.body[objects[0]][objects[1]]) {
              res.status(400);
              next(new Error('No '+param+' in body.'));
              return;
            }
          }
        }

      }
      next();
    }

  }
}
