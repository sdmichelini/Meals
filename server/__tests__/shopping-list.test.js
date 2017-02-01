'use strict';
const chai = require('chai');
const expect = chai.expect;
const request = require('superagent');
const model = require('../models/shopping-list');

describe('Shopping List Test', () => {
  describe('Unit Tests', () => {
    describe('model#getLists()', ()=>{
      it('should return a promise with the shopping lists', ()=>{
        return model.getLists()
          .then((lists)=>{
            expect(lists).to.be.an('array');
            return;
          });
      });
    });
    describe('model#createList()', () => {
      const validList = {name: 'Week of 1/29'};
      it('should return a promise with the new shopping list', () => {
        return model.createList(validList)
          .then((list) => {
            expect(list).to.be.an('object');
            // We need a MongoDB ID
            expect(list).to.have.property('_id');
            expect(list).to.have.property('name');
          });
      });
    });
    describe('model#addIngredientsToList()', () => {
      let validList = {name: 'Week of 1/29'};
      before(() => {
        return model.createList(validList)
          .then((list) => {
            validList = list;
          });
      });
      it('should add an ingredient to the specified shopping list', () => {
        return model.addIngredientsToList(['id1', 'id2'],validList._id)
          .then((list) => {
            expect(list).to.be.an('object');
            // We need a MongoDB ID
            expect(list).to.have.property('_id');
            expect(list).to.have.property('name');
            expect(list).to.have.property('ingredients');
            expect(list.ingredients).to.be.an('array');
            expect(list.ingredients.length).to.equal(2);
          });
      });
    });
    describe('model#updateIngredientOnList()', () => {
      let validList = {name: 'Week of 1/29'};
      let i_id = 'xyz;'
      let validIngredient = {id: i_id};
      before(() => {
        return model.createList(validList)
          .then((list) => {
            validList = list;
            return model.addIngredientsToList([validIngredient.id], validList._id);
          })
          .then((ingredient) => {
            validIngredient = ingredient;
          });
      });
      it('should update an ingredient', () => {
        return model.updateIngredientOnList(true, i_id, validList._id)
        .then((ingredient) => {
          expect(ingredient).to.have.property('_id');
          expect(ingredient.id).to.equal(validIngredient.id);
          expect(ingredient.purchased).to.equal(true);
        });
      });
    });
    describe('model#removeIngredientFromList()', () => {
      let validList = {name: 'Week of 1/29'};
      let i_id = 'bac'
      let validIngredient = {id: i_id};
      before(() => {
        return model.createList(validList)
          .then((list) => {
            validList = list;
            return model.addIngredientsToList([validIngredient.id], validList._id);
          })
          .then((ingredient) => {
            validIngredient = ingredient;
          });
      });
      it('should remove an ingredient from the list and return the new list without the ingredient', () => {
        return model.removeIngredientFromList(validIngredient.id, validList._id)
        .then((list) => {
          expect(list).to.be.an('array');
          for(let ingredient of list) {
            expect(ingredient._id).to.not.equal(validIngredient.id);
          }
        });
      });
    });
  });
});
