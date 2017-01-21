/*
 Database independent starting point for the Express Application
*/
'use strict';
//Third Party Modules
const express = require('express');
const cors = require('cors');
const utils = require('./utils/response');
const bodyParser = require('body-parser');

// Load our config vars
require('dotenv').config();

// Load our controllers
const meals = require('./controllers/meals');
const ingredients = require('./controllers/ingredients');

//Start application vars
let app = express();

app.use(cors());

//Basic Health Route
app.get('/api/health', (req,res)=>{
  res.json({message:'OK.'});
});

// Meals Module
app.get('/api/meals', meals.getMeals);
app.post('/api/meals' ,bodyParser.json() ,meals.addMeal);
app.delete('/api/meals/:id', meals.deleteMeal);

app.get('/api/ingredients', ingredients.getIngredientsForMeal);
app.post('/api/ingredients', bodyParser.json(), ingredients.createIngredient);
app.delete('/api/ingredients/:id', ingredients.deleteIngredient);

//Unhandled route
app.use('/api/*', (req,res)=>{
  res.status(404).json(utils.generateError('Error: Not Found'));
});

module.exports = app;
