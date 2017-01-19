/*
 Ingredient Model
*/
'use strict';

const ObjectId = require('mongodb').ObjectID;

let collection;

function initDb(db) {
  if(db) {
    collection = db.collection('meals');
  }
}

function getIngredientsForMeal(meal_id) {
  console.log('getIngredientsForMeal');
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
  console.log('DELETE'+meal_id);
  return new Promise((resolve, reject) => {
    if(meal_id.length != 24) {
      return reject(new Error('Invalid ID'));
    } else {
      let obj_id = new ObjectId(meal_id);
      collection.remove({meal_id:obj_id}, (err, count) => {
        if(err) {
          return reject(err);
        } else {
          return resolve(count);
        }
      });
    }
  });
}

function deleteIngredient(id) {

}

module.exports = {
  initDb: initDb,
  getIngredientsForMeal: getIngredientsForMeal,
  createIngredient: createIngredient,
  deleteIngredient: deleteIngredient,
  deleteAllIngredientForMeal: deleteAllIngredientForMeal
}
