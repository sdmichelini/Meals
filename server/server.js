/*
  Entry point for the server. Responsible for database and model initialization
*/
'use strict';

const MongoClient = require('mongodb').MongoClient;

const server = require('http').createServer();

let app = require('./application');
let meals_model = require('./models/meal');

const PORT = process.env.PORT || 3001;

server.on('request', app);
MongoClient.connect(process.env.MONGODB_URI, (err, database) => {
  if(err) {
    return console.error(err);
  } else {
    meals_model.initDb(database);
    server.listen(PORT, ()=>{
      console.log('Server Listening on Port: '+PORT);
    });
  }
});
