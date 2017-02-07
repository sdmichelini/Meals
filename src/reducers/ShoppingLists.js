import ShoppingListConstants from '../constants/ShoppingListConstants'

const initialState = {lists: [], loading: false, error: false};
const shoppingListReducer = (state = initialState, action) => {
  switch(action.type) {
    case ShoppingListConstants.API_CALL: {
      state = {...state, loading: true, error: false};
      break;
    }
    case ShoppingListConstants.API_ERROR: {
      state = {...state, error: true, loading: false};
      break;
    }
    case ShoppingListConstants.FLUSH_LISTS: {
      state = {...state, lists: []};
      break;
    }
    case ShoppingListConstants.ADD_LISTS: {
      state = {...state, loading: false ,lists: state.lists.concat(action.lists)}
      break;
    }
    case ShoppingListConstants.CREATE_LIST: {
      break;
    }
    default: {
      break;
    }
  }
  return state;
};

export default shoppingListReducer;
