import IngredientConstants from '../constants/IngredientConstants'
import IngredientsApi from '../utils/IngredientsApi'

function addIngredients(ingredients) {
  return {type: IngredientConstants.ADD_INGREDIENTS, ingredients: ingredients};
}

function createIngredient(ingredient) {
  return {type: IngredientConstants.CREATE_INGREDIENT, ingredient: ingredient};
}

function deleteIngredient(id) {
  return {type: IngredientConstants.DELETE_INGREDIENT, id: id};
}

export function fetchIngredients(meal_id) {
  return ((dispatch) => {
    dispatch({type: IngredientConstants.FETCH_INGREDIENTS});
    IngredientsApi.getIngredientsForMeal(meal_id)
      .then((response)=>{
        dispatch(addIngredients(response.ingredients));
      })
      .catch((response)=>{
        dispatch({type: IngredientConstants.FETCH_INGREDIENTS_ERROR, error:response.errors[0].msg||'API Error.'})
      });
  });
}

export function saveIngredient(ingredient) {
  return ((dispatch) => {
    dispatch({type: IngredientConstants.SAVE_INGREDIENTS});
    IngredientsApi.addIngredient(ingredient)
      .then((response)=>{
        dispatch(addIngredients([response.ingredient]));
      })
      .catch((response)=>{
        dispatch({type: IngredientConstants.SAVE_INGREDIENTS_ERROR, error:response.errors[0].msg || 'API Error.'})
      });
  });
}

export function removeIngredient(id) {
  return ((dispatch) => {
    dispatch({type: IngredientConstants.REMOVE_INGREDIENTS});
    IngredientsApi.deleteIngredient(id)
      .then((response)=>{
        dispatch(deleteIngredient(id));
      })
      .catch((response)=>{
        dispatch({type: IngredientConstants.REMOVE_INGREDIENTS_ERROR, error:response.errors[0].msg})
      });
  });
}
