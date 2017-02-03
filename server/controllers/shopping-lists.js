'use strict';
const utils = require('../utils/response');
const model = require('../models/shopping-list');

module.exports = {
  getShoppingLists: (req, res) => {
    model.getLists()
      .then((lists)=>{
        res.json({lists: lists});
      })
      .catch((err)=>{
        console.error(err);
        res.status(500).json(utils.generateError('Internal Server Error'));
      });
  },
  getShoppingListById: (req, res) => {
    model.getIngredientsForList(req.params.id)
      .then((ingredient_list)=>{
        if(ingredient_list) {
          res.json({list: ingredient_list});
        } else {
          res.status(404).json(utils.generateError('Could not find shopping list w/ ID'));
        }
      })
      .catch((err)=>{
        console.error(err);
        res.status(500).json(utils.generateError('Internal Server Error'));
      });
  },
  createShoppingList: (req, res) => {
    model.createList(req.body.list)
      .then((list)=>{
        res.status(201).json({list: list});
      })
      .catch((err)=>{
        console.error(err);
        res.status(500).json(utils.generateError('Internal Server Error'));
      });
  },
  addToShoppingList: (req, res) => {
    model.addIngredientsToList(req.body.ids, req.params.id)
      .then((list)=>{
        res.json({list: list});
      })
      .catch((err)=>{
        console.error(err);
        res.status(500).json(utils.generateError('Internal Server Error'));
      });
  },
  updateIngredientOnList: (req, res) => {
    model.updateIngredientOnList(req.body.purchased, req.params.ingredient_id, req.params.id)
      .then((item) => {
        res.json({ingredient: item});
      })
      .catch((err)=>{
        console.error(err);
        res.status(500).json(utils.generateError('Internal Server Error'));
      });
  },
  removeIngredientFromList: (req, res) => {
    model.removeIngredientFromList(req.params.ingredient_id, req.params.id)
      .then((list) => {
        res.json({ingredients: list});
      })
      .catch((err)=>{
        console.error(err);
        res.status(500).json(utils.generateError('Internal Server Error'));
      });
  }
}
