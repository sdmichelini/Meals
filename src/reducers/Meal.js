import MealConstants from '../constants/MealConstants'
import MealValidator from '../common/MealValidator'

const initialState = {meals: []};
const mealReducer = (state=initialState, action) => {
  switch(action.type) {
    case MealConstants.ADD_MEALS: {
      if(action.meals) {
        //Only add verified meals
        let verified_meals = [];
        for(let meal of action.meals) {
          if(MealValidator.validateMeal(meal)) {
            verified_meals = verified_meals.concat({...meal});
          } else {
            alert('Invalid Meal!')
          }
        }
        state = {...state, meals: state.meals.concat(verified_meals)};
      }
      break;
    }
    case MealConstants.EDIT_MEAL: {
      if(action.id) {
        const meals = state.meals.filter((meal)=> {return meal._id === action.id});

        if(meals.length < 1) {
          console.error('No Meal w/ ID Found');
          return state;
        }
        const meal = meals[0];
        const name = action.name || meal.name;
        state = {...state, meals: state.meals.filter((meal)=> {return meal._id !== action.id})};
        state = {...state, meals: state.meals.concat({_id: action.id, name: name})};
      }
      break;
    }
    case MealConstants.DELETE_MEAL: {
      if(action.id) {
        state = {...state, meals: state.meals.filter((meal)=> {return meal._id !== action.id})};
      }
      break;
    }
    case MealConstants.LOAD_MEALS_ERROR: {
      alert(action.error);
      break;
    }
    case MealConstants.ADD_MEAL_TO_SERVER_ERROR: {
      alert(action.error);
      break;
    }
    case MealConstants.DELETE_MEAL_FROM_SERVER_ERROR: {
      alert(action.error);
      break;
    }
    default: {
      break;
    }
  }
  return state;
}

export default mealReducer;
