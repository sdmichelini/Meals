/*
 Ingredient Model
*/
'use strict';

let collection;

function initDb(db) {
  if(db) {
    collection = db.collection('meals');
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

function deleteIngredient(id) {

}

module.exports = {
  initDb: initDb,
  getIngredientsForMeal: getIngredientsForMeal,
  createIngredient: createIngredient,
  deleteIngredient: deleteIngredient
}
