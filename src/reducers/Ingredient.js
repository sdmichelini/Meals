import IngredientConstants from '../constants/IngredientConstants'

const initialState = {ingredients: [], loading: false};

const ingredientReducer = (state=initialState, action) => {
  switch (action.type) {
    case IngredientConstants.ADD_INGREDIENTS: {
      state = {...state, ingredients: state.ingredients.concat(action.ingredients), loading: false};
      break;
    }
    case IngredientConstants.DELETE_INGREDIENT: {
      state = {...state, ingredients: state.ingredients.filter((i) => {return i._id !== action.id})};
      break;
    }
    case IngredientConstants.CREATE_INGREDIENT: {
      state = {...state, ingredients: state.ingredients.concat(action.ingredient)};
      break;
    }
    case IngredientConstants.FETCH_INGREDIENTS: {
      state = {...state, loading: true};
      break;
    }
    case IngredientConstants.FETCH_INGREDIENTS_ERROR: {
      state = {...state, loading: false};
    }
    default: {
      if(action.error) {
        alert(action.error);
      }
    }
  }
  return state;
};

export default ingredientReducer;
