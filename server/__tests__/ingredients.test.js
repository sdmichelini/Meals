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
    describe('ingredient_model#deleteMeal()', ()=> {
      let ingredient_id;
      before(() => {
        // Create a new ingrediant
        const ingredient = {meal_id: 'xyz', name: 'Chicken', amount: '2 pounds', details: 'Sam\'s Club'};
        return ingredient_model.createIngredient(ingredient.name, ingredient.amount, ingredient.details, ingredient.meal_id)
          .then((_ingredient) => {
            ingredient_id = String(_ingredient._id);
          });
      });
      it('should delete the ingredient', ()=>{
        return ingredient_model.deleteIngredient(ingredient_id)
          .then(() =>{
            return ingredient_model.getIngredientsForMeal('xyz');
          })
          .then((ingredients) => {
            expect(ingredients.filter((i) => {
              return (String(i._id) == ingredient_id);
            }).length).to.equal(0);
          });
      });
    });
  });
  describe('End-to-end tests', ()=> {
    describe('GET /api/ingredients', ()=>{
      const meal_id = 'meal10';

      const ingredient_1 = {meal_id: meal_id, name: 'Chicken', amount: '2 pounds', details: 'Sam\'s Club'};
      const ingredient_2 = {meal_id: meal_id, name: 'Beef', amount: '2 pounds', details: 'Sam\'s Club'};
      const ingredient_3 = {meal_id: 'meal2', name: 'Brocolli', amount: '2 pounds', details: 'Sam\'s Club'};
      const ingredients = [ingredient_1, ingredient_2];
      before(()=> {
        // Seed some data in the db
        return ingredient_model.createIngredient(ingredient_1.name, ingredient_1.amount, ingredient_1.details, ingredient_1.meal_id)
          .then(()=>{
            return ingredient_model.createIngredient(ingredient_2.name, ingredient_2.amount, ingredient_2.details, ingredient_2.meal_id)
          })
          .then(()=>{
            return ingredient_model.createIngredient(ingredient_3.name, ingredient_3.amount, ingredient_3.details, ingredient_3.meal_id)
          });
      });
      it('should fail w/ out a meal_id', (done)=>{
        request.get('http://localhost:3001/api/ingredients')
          .end((err, res) => {
            expect(err).to.be.ok;
            expect(res.status).to.equal(400);
            done();
          });
      });
      it('should succeed w/ grabbing some w/ a valid meal id', (done) => {
        request.get('http://localhost:3001/api/ingredients?meal_id='+meal_id)
          .end((err, res) => {
            expect(err).to.not.be.ok;
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('ingredients');
            expect(res.body.ingredients).to.be.an('array');
            expect(res.body.ingredients.length).to.equal(2);
            // Property Checks
            for(let ingredient of res.body.ingredients) {
              let matched = false;
              expect(ingredient.meal_id).to.equal(meal_id);
              for(let i of ingredients) {
                if((i.name == ingredient.name) && (i.amount == ingredient.amount) && (i.details == ingredient.details)) {
                  matched = true;
                }
              }
              expect(matched).to.equal(true);
            }
            done();
          });
      });
    });
    describe('POST /api/ingredients', ()=>{
      const test_ingredient_ok = {name: 'Bacon', meal_id: 'aaab', amount: 'xyz', details: 'rick'};
      const test_ingredient_ok_no_details = {name: 'Sausage', meal_id: 'aaac', amount:'xzz'};
      const test_ingredient_fail_nothing = {};
      const test_ingredient_fail_no_name = {meal_id: 'aaab', amount: 'xyz', details: 'rick'};
      const test_ingredient_fail_no_meal_id = {name: 'Bacon', amount: 'xyz', details: 'rick'};
      const test_ingredient_fail_no_amount = {name: 'Bacon', meal_id: 'xyz', details: 'rick'};
      it('should succeed with a valid ingredient', (done)=> {
        request.post('http://localhost:3001/api/ingredients')
          .type('json')
          .send({ingredient: test_ingredient_ok})
          .end((err, res) => {
            expect(err).to.not.be.ok;
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('ingredient');
            expect(res.body.ingredient).to.be.an('object');
            expect(res.body.ingredient).to.have.property('name');
            expect(res.body.ingredient).to.have.property('meal_id');
            expect(res.body.ingredient).to.have.property('amount');
            expect(res.body.ingredient).to.have.property('details');
            // We can ensure it got saved to mongo if there is an _id
            expect(res.body.ingredient).to.have.property('_id');
            expect(res.body.ingredient.name).to.equal(test_ingredient_ok.name);
            expect(res.body.ingredient.meal_id).to.equal(test_ingredient_ok.meal_id);
            expect(res.body.ingredient.amount).to.equal(test_ingredient_ok.amount);
            expect(res.body.ingredient.details).to.equal(test_ingredient_ok.details);
            done();
          });
      });
      it('should succeed without any details in request', (done)=> {
        request.post('http://localhost:3001/api/ingredients')
          .type('json')
          .send({ingredient: test_ingredient_ok_no_details})
          .end((err, res) => {
            expect(err).to.not.be.ok;
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('ingredient');
            expect(res.body.ingredient).to.be.an('object');
            expect(res.body.ingredient).to.have.property('name');
            expect(res.body.ingredient).to.have.property('meal_id');
            expect(res.body.ingredient).to.have.property('amount');
            // We can ensure it got saved to mongo if there is an _id
            expect(res.body.ingredient).to.have.property('_id');
            expect(res.body.ingredient.name).to.equal(test_ingredient_ok_no_details.name);
            expect(res.body.ingredient.meal_id).to.equal(test_ingredient_ok_no_details.meal_id);
            expect(res.body.ingredient.amount).to.equal(test_ingredient_ok_no_details.amount);
            done();
          });
      });
      it('should fail with an empty object', (done) => {
        request.post('http://localhost:3001/api/ingredients')
          .type('json')
          .send({ingredient: test_ingredient_fail_nothing})
          .end((err, res) => {
            expect(err).to.be.ok;
            expect(res.status).to.equal(400);
            done();
          });
      });
      it('should fail with no ingredient', (done) => {
        request.post('http://localhost:3001/api/ingredients')
          .type('json')
          .send({})
          .end((err, res) => {
            expect(err).to.be.ok;
            expect(res.status).to.equal(400);
            done();
          });
      });
      it('should fail with no name', (done) => {
        request.post('http://localhost:3001/api/ingredients')
          .type('json')
          .send({ingredient: test_ingredient_fail_no_name})
          .end((err, res) => {
            expect(err).to.be.ok;
            expect(res.status).to.equal(400);
            done();
          });
      });
      it('should fail with no meal_id', (done) => {
        request.post('http://localhost:3001/api/ingredients')
          .type('json')
          .send({ingredient: test_ingredient_fail_no_meal_id})
          .end((err, res) => {
            expect(err).to.be.ok;
            expect(res.status).to.equal(400);
            done();
          });
      });
      it('should fail with no amount', (done) => {
        request.post('http://localhost:3001/api/ingredients')
          .type('json')
          .send({ingredient: test_ingredient_fail_no_amount})
          .end((err, res) => {
            expect(err).to.be.ok;
            expect(res.status).to.equal(400);
            done();
          });
      });
    });
    describe('DELETE /api/ingredients/:id', ()=>{
      it('should delete an ingredient', ()=>{
        const test_ingredient_ok = {name: 'Bacon', meal_id: 'aaab', amount: 'xyz', details: 'rick'};
        ingredient_model.createIngredient(test_ingredient_ok.name, test_ingredient_ok.amount, test_ingredient_ok.details, test_ingredient_ok.meal_id)
          .then((_ingredient)=>{
            return request.delete('http://localhost:3001/api/ingredients/'+String(_ingredient._id))
              .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('msg');
                expect(res.body.msg).to.be.an('string');
              });
          });
      });
    })
  });
});
