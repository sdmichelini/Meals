import ShoppingListApi from '../utils/ShoppingListApi'
import ShoppingsListsConstants from '../constants/ShoppingListConstants'

const flushLists = {type: ShoppingsListsConstants.FLUSH_LISTS};
const apiCall = {type: ShoppingsListsConstants.API_CALL};
const apiFail = {type: ShoppingsListsConstants.API_ERROR};

export function fetchLists() {
  return ((dispatch) => {
    console.log('here');
    // Clear what we have
    dispatch(flushLists);
    dispatch(apiCall);

    ShoppingListApi.getShoppingLists()
      .then((response) => {

      })
      .catch((err) => {
        dispatch(apiFail);
        if(err) {
          alert(err);
        }
      });
  });
}
