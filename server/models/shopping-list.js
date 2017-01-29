/*
  Model for the shopping list
*/
'use strict';

const ObjectId = require('mongodb').ObjectID;

let collection = undefined;

module.exports = {
  initDb: (db) => {
    collection = db.collection('shopping-lists');
  },
  getLists: () => {
    /*
     - Get's a list of all of the shopping lists and returns them via a promise
    */
    return new Promise((resolve, reject) => {
      collection.find({}).toArray((err, lists) => {
        if(err){
          reject(err);
        } else {
          resolve(lists);
        }
      });
    });
  },
  createList: (list) => {
    return new Promise((resolve, reject) => {
      if(!list.name) {
        reject(err);
      } else {
        // Only let the name pass through
        let new_list = {name: list.name, ingredients: []};
        collection.insert(new_list, (err, result) => {
          if(err){
            reject(err);
          } else {
            resolve(new_list);
          }
        });
      }
    });
  },
  addIngredientsToList:(ingredient_ids, list_id) => {
    return new Promise((resolve, reject) => {
      collection.findAndModify({'_id': new ObjectId(list_id)}, { $push: { ingredients: { $each: ingredient_ids }}}, { new : true },(err, documents) => {
        if(err) {
          reject(err);
        } else {
          let list = documents.value;
          list.ingredients = list.ingredients.concat(ingredient_ids);
          resolve(list);
        }
      });
    });
  }
}
