import MealConstants from '../constants/MealConstants';

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
