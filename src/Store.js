/*
This is the redux store

*/

import { createStore } from 'redux'

// Import the reducers

import MealReducer from './reducers/Meal'

let store = createStore(MealReducer);

export default store;
