/*
  Entry point for the server. Responsible for database and model initialization
*/
'use strict';

const MongoClient = require('mongodb').MongoClient;

const server = require('http').createServer();

let app = require('./application');
let meals_model = require('./models/meal');
let ingredients_model = require('./models/ingredient');
let shopping_list_model = require('./models/shopping-list');

const PORT = process.env.PORT || 3001;

server.on('request', app);
MongoClient.connect(process.env.MONGODB_URI, (err, database) => {
  if(err) {
    return console.error(err);
  } else {
    meals_model.initDb(database);
    ingredients_model.initDb(database);
    shopping_list_model.initDb(database);
    server.listen(PORT, ()=>{
      console.log('Server Listening on Port: '+PORT);
    });
  }
});
