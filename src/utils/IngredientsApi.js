import request from 'superagent/lib/client'
import URL from '../constants/Url'

export default {
  getIngredientsForMeal: (meal_id) => {
    return new Promise((resolve,reject) => {
      request.get(URL+'/api/ingredients?meal_id='+meal_id)
        .end((err,response) => {
          if(err) reject(JSON.parse(response.text));
          resolve(JSON.parse(response.text));
        });
    });
  },
  addIngredient: (ingredient) => {
    return new Promise((resolve,reject) => {
      request.post(URL+'/api/ingredients')
        .send({ingredient: ingredient})
        .type('json')
        .end((err,response) => {
          if(err) reject(JSON.parse(response.text));
          resolve(JSON.parse(response.text));
        });
    });
  },
  deleteIngredient: (id) => {
    return new Promise((resolve, reject) => {
      request.delete(URL+'/api/ingredients/'+id)
        .end((err,response) => {
          if(err) reject(JSON.parse(response.text));
          resolve(JSON.parse(response.text));
        });
    });
  }
}
