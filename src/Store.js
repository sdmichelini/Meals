/*
This is the redux store

*/

import { createStore, applyMiddleware, combineReducers } from 'redux'
import ReduxThunk from 'redux-thunk'

// Import the reducers

import MealReducer from './reducers/Meal'
import IngredientReducer from './reducers/Ingredient'

let store = createStore(combineReducers({
  meals: MealReducer,
  ingredients: IngredientReducer
}),applyMiddleware(ReduxThunk));

export default store;
