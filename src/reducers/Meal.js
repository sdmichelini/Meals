import MealConstants from '../constants/MealConstants';

const initialState = [];
const mealReducer = (state=initialState, action) => {
  switch(action.type) {
    case MealConstants.ADD_MEALS: {
      if(action.meals) {
        state = state.concat(action.meals);
      }
      break;
    }
    case MealConstants.EDIT_MEAL: {
      if(action.id) {
        const meals = state.filter((meal)=> {return meal._id === action.id});

        if(meals.length < 1) {
          console.error('No Meal w/ ID Found');
          return state;
        }
        const meal = meals[0];
        const name = action.name || meal.name;
        state = state.filter((meal)=> {return meal._id !== action.id});
        state = state.concat({_id: action.id, name: name});
      }
      break;
    }
    case MealConstants.DELETE_MEAL: {
      if(action.id) {
        state = state.filter((meal)=> {return meal._id !== action.id});
      }
      break;
    }
  }
  return state;
}

export default mealReducer;
