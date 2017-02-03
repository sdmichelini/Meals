'use strict';

/*
  get all of the meals
*/

const meal_model = require('../models/meal');
const utils = require('../utils/response');

const validator = require('../../src/common/MealValidator');

function getMeals(req, res) {
  // use a promise to get the meals
  meal_model.getMeals()
    .then((meals) => {
      res.json({meals: meals});
    })
    .catch((err) => {
      res.status(500).json(utils.generateError('Error: Internal Server Error'));
    });
}

function addMeal(req, res) {
  // Only one property is tranfered
  // Validate the name

  let meal = {name: req.body.meal.name};
  meal = validator.validateMeal(meal);
  if(meal) {
    meal_model.addMeal(meal)
      .then((_meal) => {
        res.status(201).json({meal: _meal});
      })
      .catch((err) => {
        res.status(500).json(utils.generateError('Error: Internal Server Error'));
      });
  } else {
    res.status(400).json(utils.generateError('Error: Invalid Meal Name'));
  }
}

function deleteMeal(req, res) {
  meal_model.deleteMeal(req.params.id)
    .then((count)=>{
      res.json({msg: 'Deleted'});
    })
    .catch((err)=>{
      res.status(500).json(utils.generateError('Error: Internal Server Error'));
    });
}

module.exports = {
  getMeals: getMeals,
  addMeal: addMeal,
  deleteMeal: deleteMeal
}
