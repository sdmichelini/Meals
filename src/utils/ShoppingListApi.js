import request from 'superagent/lib/client'
import URL from '../constants/Url'

/*
  Interacts w/ our backend
*/
export default {
  // Load all of the shopping lists
  getShoppingLists: () => {
    return new Promise((resolve, reject) => {
      request.get(URL+'/api/shopping-lists')
        .end((err,response) => {
          if(err) reject(JSON.parse(response.text));
          resolve(JSON.parse(response.text));
        });
    });
  },
  // Load a single shopping list
  getShoppingListById: (id) => {
    return new Promise((resolve, reject) => {
      request.get(URL+'/api/shopping-lists/'+id)
        .end((err,response) => {
          if(err) reject(JSON.parse(response.text));
          resolve(JSON.parse(response.text));
        });
    });
  },
  // Create a new blank shopping list
  createShoppingList: (name) => {
    return new Promise((resolve, reject) => {
      request.post(URL+'/api/shopping-lists')
        .send({list: {name: name}})
        .type('json')
        .end((err,response) => {
          if(err) reject(JSON.parse(response.text));
          resolve(JSON.parse(response.text));
        });
    });
  },
  // Add to a shopping list
  addToShoppingList: (ingredient_ids, id) => {
    return new Promise((resolve, reject) => {
      request.put(URL+'/api/shopping-lists/'+id)
        .send({id: ingredient_ids})
        .type('json')
        .end((err,response) => {
          if(err) reject(JSON.parse(response.text));
          resolve(JSON.parse(response.text));
        });
    });
  },
  // Update a todo on the ingredient list
  updateIngredientOnList: (ingredient_id, purchased, id) => {
    return new Promise((resolve, reject) => {
      request.put(URL+'/api/shopping-lists/'+id+'/ingredients/'+ingredient_id)
        .send({purchased: purchased})
        .type('json')
        .end((err,response) => {
          if(err) reject(JSON.parse(response.text));
          resolve(JSON.parse(response.text));
        });
    });
  },
  // Remove an ingredient from the list
  removeIngredientFromList: (ingredient_id, id) => {
    return new Promise((resolve, reject) => {
      request.delete(URL+'/api/shopping-lists/'+id+'/ingredients/'+ingredient_id)
        .end((err,response) => {
          if(err) reject(JSON.parse(response.text));
          resolve(JSON.parse(response.text));
        });
    });
  }
}
