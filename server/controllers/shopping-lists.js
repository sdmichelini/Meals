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
    if(!req.params.id) {
      res.status(400).json(utils.generateError('No ID in Request'));
    }else if(req.params.id.length != 24){
      res.status(404).json(utils.generateError('ID Not Found.'));
    }else{
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
    }
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
  }
}
