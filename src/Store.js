/*
This is the redux store

*/

import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

// Import the reducers

import MealReducer from './reducers/Meal'

let store = createStore(MealReducer,applyMiddleware(ReduxThunk));

export default store;
