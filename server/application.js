/*
 Database independent starting point for the Express Application
*/
'use strict';
//Third Party Modules
const express = require('express');
const cors = require('cors');
const utils = require('./utils/response');
const bodyParser = require('body-parser');

const checkParam = require('./utils/check-param');

// Load our config vars
require('dotenv').config();

// Load our controllers
const meals = require('./controllers/meals');
const ingredients = require('./controllers/ingredients');
const shoppingLists = require('./controllers/shopping-lists');

//Start application vars
let app = express();

app.use(cors());

//Basic Health Route
app.get('/api/health', (req,res)=>{
  res.json({message:'OK.'});
});

// Meals Module
app.get('/api/meals', meals.getMeals);
app.post('/api/meals' ,bodyParser.json() ,checkParam(['meal.name']) ,meals.addMeal);
app.delete('/api/meals/:id', meals.deleteMeal);

app.get('/api/ingredients', ingredients.getIngredientsForMeal);
app.post('/api/ingredients', bodyParser.json(), checkParam(['ingredient','ingredient.name','ingredient.amount','ingredient.meal_id']), ingredients.createIngredient);
app.delete('/api/ingredients/:id', ingredients.deleteIngredient);

app.get('/api/shopping-lists', shoppingLists.getShoppingLists);
app.get('/api/shopping-lists/:id', shoppingLists.getShoppingListById);
app.post('/api/shopping-lists/', bodyParser.json(), checkParam(['list.name']), shoppingLists.createShoppingList);

//Handle Client Side Errors
/*
  This will catch the errors sent by the middleware since Express does not pass errors
  onto next route handlers. This will intercept all 400 calls and send back the error
  in the error response format.
*/
app.use((err, req, res, next) => {
  if(res.statusCode == 400) {
    res.json(utils.generateError(err.message));
  } else {
    next(err);
  }
})

//Unhandled route
app.use('/api/*', (req,res)=>{
  res.status(404).json(utils.generateError('Error: Not Found'));
});

module.exports = app;
