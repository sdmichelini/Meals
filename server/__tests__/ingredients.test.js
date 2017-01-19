'use strict';
const chai = require('chai');
const expect = chai.expect;
const request = require('superagent');
const ingredient_model = require('../models/ingredient');

describe('Ingrediants Test',() => {
  describe('Unit Tests', ()=>{
    describe('ingredient_model#getIngredientsForMeal()', ()=>{
      it('should return a list of ingredients', ()=>{
        return ingredient_model.getIngredientsForMeal('xyz').then((meals)=>{
          expect(meals).to.be.an('array');
        });
      });
    });
    describe('ingredient_model#createIngredient()', ()=> {
      it('should add a meal and then be able to retrieve it', ()=>{
        const ingredient = {meal_id: 'xyz', name: 'Chicken', amount: '2 pounds', details: 'Sam\'s Club'};
        return ingredient_model.createIngredient(ingredient.name, ingredient.amount, ingredient.details, ingredient.meal_id)
          .then((_ingredient) => {
            expect(_ingredient).to.have.property('_id');
            expect(_ingredient).to.have.property('name');
            expect(_ingredient).to.have.property('meal_id');
            expect(_ingredient).to.have.property('amount');
            expect(_ingredient).to.have.property('details');
            expect(_ingredient.name).to.equal(ingredient.name);
            expect(_ingredient.meal_id).to.equal(ingredient.meal_id);
            expect(_ingredient.amount).to.equal(ingredient.amount);
            expect(_ingredient.details).to.equal(ingredient.details);
            return ingredient_model.getIngredientsForMeal(ingredient.meal_id);
          }).then((ingredients) => {
            expect(ingredients).to.be.an('array');
          });
      });
    });
  });
});
