'use strict';
// load in our ingredient model
const ingredient_model = require('../models/ingredient');
const utils = require('../utils/response');

function getIngredientsForMeal(req, res) {
  if(!req.query.meal_id) {
    res.status(400).json(utils.generateError('No Meal ID Provided.'));
  } else {
    ingredient_model.getIngredientsForMeal(req.query.meal_id)
      .then((ingredients) => {
        res.json({ingredients: ingredients});
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(utils.generateError('Internal Server Error'));
      })
  }
}

function createIngredient(req, res) {
  const ingredient = req.body.ingredient;
  ingredient_model.createIngredient(ingredient.name, ingredient.amount, ingredient.details || undefined, ingredient.meal_id)
  .then((_ingredient) => {
    res.status(201).json({ingredient: _ingredient});
  })
  .catch((err) => {
    console.error(err);
    res.status(500).generateError('Internal Server Error.');
  });
}

function deleteIngredient(req, res) {
  if(!req.params.id) {
    res.status(400).json(utils.generateError('No ID in Request'));
  } else {
    ingredient_model.deleteIngredient(req.params.id)
      .then((result) => {
        res.json({msg: 'Deleted '+result.n+' records'});
      })
      .catch((err) => {
        res.status(500).json(utils.generateError('Internal Server Error.'));
      });
  }
}

module.exports = {
  getIngredientsForMeal: getIngredientsForMeal,
  createIngredient: createIngredient,
  deleteIngredient: deleteIngredient
}
