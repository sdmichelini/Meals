import ShoppingsListsConstants from '../constants/ShoppingListConstants'

const initialState = {lists: [], loading: false, error: false};
const shoppingListReducer = (state = initialState, action) => {
  switch(action.type) {
    case ShoppingsListsConstants.API_CALL: {
      state = {...state, loading: true, error: false};
      break;
    }
    case ShoppingsListsConstants.API_ERROR: {
      state = {...state, error: true, loading: false};
      break;
    }
    case ShoppingsListsConstants.FLUSH_LISTS: {
      state = {...state, lists: []};
      break;
    }
    case ShoppingsListsConstants.CREATE_LIST: {
      break;
    }
    default: {
      break;
    }
  }
  return state;
};

export default shoppingListReducer;
