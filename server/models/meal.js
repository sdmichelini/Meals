/*
  Model for the meals
*/
'use strict';
// cache
let MEALS = [];

let collection = undefined;
let need_update = true;

const ObjectId = require('mongodb').ObjectID;

function initDb(db) {
  if(db) {
    collection = db.collection('meals');
    // use a promise to signal when done
    return populateMeals();
  } else {
    return ((resolve, reject)=>{
      let err = 'No Database';
      console.error(err);
      reject(new Error(err));
    });
  }
}

function populateMeals() {
  return new Promise((resolve, reject) => {
    collection.find({}).toArray((err, meals) => {
      if(err) {
        reject(err);
      } else {
        MEALS = meals;
        need_update = false;
        resolve(meals);
      }
    });
  });
}

function getMeals() {
  return new Promise((resolve, reject) => {
    if(need_update && collection) {
      console.log('here');
      collection.find({}).toArray((err, meals) => {
        if(err) {
          reject(err);
        } else {
          MEALS = meals;
          need_update = false;
          resolve(meals);
        }
      });
    } else if(!collection) {
      return reject(new Error('No Database'));
    } else {
      resolve(MEALS);
    }
  });
}
/*
 Add a meal to the database
*/
function addMeal(meal) {
  return new Promise((resolve, reject) => {
    if(collection) {
      collection.insert(meal, (err, result) => {
        if(err) {
          reject(err);
        } else {
          MEALS = MEALS.concat(meal);
          resolve(meal);
        }
      });
    } else {
      return reject(new Error('No Database'));
    }
  });
}

function deleteMeal(id) {
  return new Promise((resolve, reject) => {
    if(id.length != 24) {
      return reject(new Error('Invalid ID'));
    } else {
      let obj_id = new ObjectId(id);
      collection.remove({'_id':obj_id}, (err, count) => {
        if(err) {
          return reject(err);
        } else {
          return resolve(count);
          MEALS = MEALS.filter((meal) => {return meal._id != id});
        }
      });
    }
  });
}

module.exports = {
  getMeals: getMeals,
  addMeal: addMeal,
  deleteMeal: deleteMeal,
  initDb: initDb
}
