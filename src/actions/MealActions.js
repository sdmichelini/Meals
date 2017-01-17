import MealConstants from '../constants/MealConstants'

import MealsApi from '../utils/MealsApi'

/*
 Add meal objects
*/
export function addMeals(meals) {
  return {
    type: MealConstants.ADD_MEALS,
    meals: meals
  }
}
/*
  Add meal to server
*/
export function addMealToServer(meal) {
  return((dispatch) => {
    dispatch({
      type: MealConstants.ADD_MEAL_TO_SERVER
    });
    MealsApi.addMeal(meal)
      .then((response) => {
        dispatch(addMeals([response.meal]));
      })
      .catch((response) => {
        dispatch({
          type: MealConstants.ADD_MEAL_TO_SERVER_ERROR,
          error: response.errors[0].msg
        })
      });
  });
}

/*
 Edit the meal.

 Possible edits: (name)
*/
export function editMeal(id, name) {
  return {
    type: MealConstants.EDIT_MEAL,
    id: id,
    name: name
  }
}

/*
  Delete a meal w/ a given id
*/
export function deleteMeal(id) {
  return {
    type: MealConstants.DELETE_MEAL,
    id: id
  }
}

function loadMeals() {
  return {
    type: MealConstants.LOAD_MEALS
  }
}

function loadMealsError(error) {
  return {
    type: MealConstants.LOAD_MEALS_ERROR,
    error: error
  }
}

export function fetchMeals() {
  return ((dispatch) => {
    dispatch(loadMeals);
    MealsApi.getMeals()
      .then((response) => {
        dispatch(addMeals(response.meals));
      })
      .catch((response) => {
        dispatch(loadMealsError(response.errors[0].msg));
      });
  });
}
