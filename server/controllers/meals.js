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
  if(!req.body || !req.body.meal) {
    res.status(400).json(utils.generateError('Error: No Meal Found in Body'));
  } else if(!req.body.meal.name) {
    res.status(400).json(utils.generateError('Error: No Name Found in Meal'));
  } else {
    // Only one property is tranfered
    const meal = {name: req.body.meal.name};
    meal_model.addMeal(meal)
      .then((_meal) => {
        res.status(201).json({meal: _meal});
      })
      .catch((err) => {
        res.status(500).json(utils.generateError('Error: Internal Server Error'));
      });
  }
  // Validate the name
}

function deleteMeal(req, res) {
  if(!req.params.id) {
    res.status(400).json(utils.generateError('Error: No ID Found'));
  } else {
    meal_model.deleteMeal(req.params.id)
      .then((count)=>{
        res.json({msg: 'Deleted'});
      })
      .catch((err)=>{
        res.status(500).json(utils.generateError('Error: Internal Server Error'));
      });
  }
}

module.exports = {
  getMeals: getMeals,
  addMeal: addMeal,
  deleteMeal: deleteMeal
}
