/*
 Ingredient Model
*/
'use strict';

const ObjectId = require('mongodb').ObjectID;

let collection;

function initDb(db) {
  if(db) {
    collection = db.collection('ingredients');
  }
}

function getIngredientsForMeal(meal_id) {
  return new Promise((resolve, reject) => {
    collection.find({meal_id: meal_id}).toArray((err, meals)=>{
      if(err) {
        return reject(err);
      } else {
        return resolve(meals);
      }
    });
  });
}

function createIngredient(name, amount, details, meal_id) {
  return new Promise((resolve, reject) => {
    let ingredient = {name: name, amount: amount, details: details, meal_id: meal_id};
    collection.insert(ingredient, (err, result) => {
      if(err) {
        return reject(err);
      } else {
        return resolve(ingredient);
      }
    });
  });
}

function deleteAllIngredientForMeal(meal_id) {
  return new Promise((resolve, reject) => {
    if(meal_id.length != 24) {
      return reject(new Error('Invalid ID'));
    } else {
      collection.deleteMany({meal_id:meal_id}, (err, result) => {
        if(err) {
          return reject(err);
        } else {
          return resolve(result.result);
        }
      });
    }
  });
}

function deleteIngredient(id) {
  return new Promise((resolve, reject) => {
    if(!id || id.length != 24) {
      return reject(new Error('Invalid ID'));
    } else {
      collection.remove({'_id': new ObjectId(id)}, (err, result)=>{
        if(err) {
          return reject(err);
        } else {
          return resolve(result.result);
        }
      });
    }
  });
}

module.exports = {
  initDb: initDb,
  getIngredientsForMeal: getIngredientsForMeal,
  createIngredient: createIngredient,
  deleteIngredient: deleteIngredient,
  deleteAllIngredientForMeal: deleteAllIngredientForMeal
}
