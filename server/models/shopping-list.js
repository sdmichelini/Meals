/*
  Model for the shopping list
*/
'use strict';

const ObjectId = require('mongodb').ObjectID;

let list_collection = undefined;

let getIngredientsForList = (list_id) => {
  /*
   - Get's a list of ingredients for a given shopping list and returns them via a promise

   - We have this function defined outside of the exports because it is used by updateIngredientOnList
  */
  return new Promise((resolve, reject) => {
    list_collection.findOne({'_id': new ObjectId(list_id)}, (err, ingredient_list) => {
      if(err){
        reject(err);
      } else {
        resolve(ingredient_list);
      }
    });
  });
};

module.exports = {
  initDb: (db) => {
    list_collection = db.collection('shoppingLists');
  },
  getLists: () => {
    /*
     - Get's a list of all of the shopping lists and returns them via a promise
    */
    return new Promise((resolve, reject) => {
      list_collection.find({}).toArray((err, lists) => {
        if(err){
          reject(err);
        } else {
          resolve(lists);
        }
      });
    });
  },
  getIngredientsForList: getIngredientsForList,
  createList: (list) => {
    return new Promise((resolve, reject) => {
      if(!list.name) {
        reject(err);
      } else {
        // Only let the name pass through
        let new_list = {name: list.name, ingredients: []};
        list_collection.insert(new_list, (err, result) => {
          if(err){
            reject(err);
          } else {
            resolve(new_list);
          }
        });
      }
    });
  },
  /*
   - Add's a list of ingredient ID's to a shopping list
  */
  addIngredientsToList:(ingredient_ids, list_id) => {
    return new Promise((resolve, reject) => {
      // Represent each ingredient as a to-do item on a shopping list
      let ingredients_todos = [];
      for(let id of ingredient_ids) {
        ingredients_todos.push({_id: id, purchased: false});
      }
      list_collection.findOneAndUpdate({'_id': new ObjectId(list_id)}, { $push: { ingredients: { $each: ingredients_todos }}},  (err, documents) => {
        if(err) {
          reject(err);
        } else {
          let list = documents.value;
          if(!list) {
            reject(new Error('No Document Value.'));
          } else {
            list.ingredients = list.ingredients.concat(ingredients_todos);
            resolve(list);
          }
        }
      });
    });
  },

  /*
  - Updates an ingredient on a shopping list
  */
  updateIngredientOnList:(value, ingredient_id, list_id) => {
    return new Promise((resolve, reject) => {
        getIngredientsForList(list_id)
          .then((list) => {
            let item_fixed = undefined;
            for(let item of list.ingredients) {
              if(item._id == ingredient_id) {
                item.purchased = (value) ? true : false;
                item_fixed = item;
                break;
              }
            }
            list_collection.update({'_id': new ObjectId(list_id)}, {$set: {ingredients: list.ingredients}}, (err, result) => {
              if(err) {
                reject(err);
              } else {
                resolve(item_fixed);
              }
            });
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          });
    });
  },
  removeIngredientFromList: (ingredient_id, list_id) => {
    return new Promise((resolve, reject) => {
      getIngredientsForList(list_id)
        .then((list) => {
          let new_ingredients = list.ingredients.filter((item) => {return item._id != ingredient_id});
          list_collection.update({'_id': new ObjectId(list_id)}, {$set: {ingredients: new_ingredients}}, (err, result) => {
            if(err) {
              reject(err);
            } else {
              resolve(new_ingredients);
            }
          });
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }
}
