/*
  Test Entry Point

*/
'use strict';
const expect = require('chai').expect;

const app = require('../application');

const MongoClient = require('mongodb').MongoClient;

const meal_model = require('../models/meal');
const ingredient_model = require('../models/ingredient');

describe('Server Tests', ()=>{
  const port = process.env.PORT || 3001;
  let server;
  let db;
  // Start the server
  before((done)=>{
    MongoClient.connect('mongodb://localhost:27017/meals_test', (err, _db)=>{
      if(err) {
        console.error('Could Not Connect to MongoDB');
      }
      meal_model.initDb(_db);
      ingredient_model.initDb(_db);
      db = _db;
      server = app.listen(port, done);
    });
  });

  after((done) => {
    db.dropDatabase((err, result)=>{
      server.close();
      done();
    });
  });
  require('./server.test');
  require('./meals.test');
  require('./ingredients.test');
});
