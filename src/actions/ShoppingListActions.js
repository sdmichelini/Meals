import ShoppingListApi from '../utils/ShoppingListApi'
import ShoppingsListsConstants from '../constants/ShoppingListConstants'

const flushLists = {type: ShoppingsListsConstants.FLUSH_LISTS};
const apiCall = {type: ShoppingsListsConstants.API_CALL};
const apiFail = {type: ShoppingsListsConstants.API_ERROR};

function addLists(lists) {
  return { type:ShoppingsListsConstants.ADD_LISTS,
          lists: lists};
}

export function fetchLists() {
  return ((dispatch) => {
    // Clear what we have
    dispatch(flushLists);
    dispatch(apiCall);

    ShoppingListApi.getShoppingLists()
      .then((response) => {
        dispatch(addLists(response.lists));
      })
      .catch((err) => {
        dispatch(apiFail);
        if(err) {
          alert(err);
        }
      });
  });
}

export function createList(name) {
  return ((dispatch) => {
    dispatch(apiCall);
    ShoppingListApi.createShoppingList(name)
      .then((response) => {
        dispatch(addLists([response.list]));
      })
      .catch((err) => {
        dispatch(apiFail);
        if(err) {
          alert(err);
        }
      });
  });
}
