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
  describe('End to End Tests', ()=> {
    describe('GET /api/shopping-lists', ()=>{
      it('should get a list of all of the shopping lists', (done)=>{
        request.get('http://localhost:3001/api/shopping-lists')
          .end((err, res) => {
            expect(err).to.not.be.ok;
            expect(res.body).to.have.property('lists');
            expect(res.body.lists).to.be.an('array');
            done();
          });
      });
    });
    describe('GET /api/shopping-lists/:id', ()=>{
      let validList = {name: 'Week of 1/29'};
      before(()=>{
        return model.createList(validList)
          .then((list) => {
            validList = list;
          });
      });
      it('should get a single shopping list', (done)=>{
        request.get('http://localhost:3001/api/shopping-lists/'+validList._id)
          .end((err, res) => {
            expect(err).to.not.be.ok;
            expect(res.body).to.have.property('list');
            expect(res.body.list).to.be.an('object');
            expect(res.body.list).to.have.property('ingredients');
            expect(res.body.list.ingredients).to.be.an('array');
            done();
          });
      });
      it('should have a 404 if no list is found', (done)=>{
        request.get('http://localhost:3001/api/shopping-lists/not-found')
          .end((err, res) => {
            expect(err).to.be.ok;
            expect(res.status).to.equal(404);
            done();
          });
      });
    });
    describe('POST /api/shopping-lists', ()=>{
      it('should add a new shopping list',(done)=>{
        const new_list = {name: 'Week of 1/29'};
        request.post('http://localhost:3001/api/shopping-lists/')
          .send({list: new_list})
          .end((err, res) => {
            expect(err).to.not.be.ok;
            expect(res.status).to.equal(201);
            done();
          });
      });
    });
  });
});
