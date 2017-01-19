'use strict';
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
const expect = chai.expect;
const request = require('superagent');

const meal_model = require('../models/meal');
// For Integration Tests
const ingredient_model = require('../models/ingredient');

describe('Meals Test',()=>{
  describe('Unit Tests', ()=>{
    describe('meal_model#getMeals()', ()=>{
      it('should return a promise with the meals', ()=>{
        return meal_model.getMeals()
          .then((meals)=>{
            expect(meals).to.be.an('array');
            return;
          });
      });
    });
    describe('meal_model#addMeal()', ()=>{
      it('should return a promise with the meal', ()=>{
        const meal = {name:'Chicken'};
        return new Promise((resolve,reject)=>{
          meal_model.addMeal(meal)
          .then((_meal)=>{
            expect(_meal).to.be.an('object');
            expect(_meal).to.have.property('name');
            expect(_meal.name).to.equal(meal.name);
            expect(_meal).to.have.property('_id');
            resolve();
          }).catch((err)=>{
            reject(err);
          });
        });
      });
    });
    describe('meal_model#deleteMeal()', () => {
      it('should delete a meal', ()=>{
        const meal = {name:'Chicken'};
        return meal_model.addMeal(meal)
          .then((_meal)=>{
            return meal_model.deleteMeal(String(_meal._id));
          });
      });
    });
  });
  describe('Model Integration Tests', ()=>{
    let meal_id;
    before(() => {
      // Create a mock meal with an igrediant
      const meal = {name:'Parfait'};
      return meal_model.addMeal(meal)
        .then((_meal) => {
          meal_id = String(_meal._id);
          return ingredient_model.createIngredient('Mock Ingredient', 'X','X', meal_id);
        });
    });
    it('should cascade a delete of a meal to all the associated ingredients', () => {
      return meal_model.deleteMeal(meal_id)
        .then((count) => {
          console.log('TEST'+meal_id)
          count = count.result.n;
          expect(count).to.equal(1);
          ingredient_model.getIngredientsForMeal(meal_id);
        })
        .then((ingredients) => {
          console.log(ingredients);
          expect(ingredients).to.be.an('array');
          expect(ingredients.length).to.equal(0);
        });
    });
  });
  describe('End-to-end Tests', ()=> {
    describe('GET /api/meals', ()=>{
      it('should succeed', (done)=>{
        request.get('http://localhost:3001/api/meals')
          .end((err, res) => {
            expect(err).to.not.be.ok;
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('meals');
            expect(res.body.meals).to.be.an('array');
            done();
          });
      });
    });
    describe('POST /api/meals', ()=>{
      it('should succeed w/ valid meal and name', (done)=>{
        const meal = {name:'Chicken'};
        request.post('http://localhost:3001/api/meals')
          .type('json')
          .send({meal: meal})
          .end((err, res) => {
            expect(err).to.not.be.ok;
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('meal');
            expect(res.body.meal).to.be.an('object');
            expect(res.body.meal).to.have.property('name');
            expect(res.body.meal).to.have.property('_id');
            expect(res.body.meal.name).to.equal(meal.name);
            done();
          });
      });
      it('should fail w/ without name', (done)=>{
        const meal = {_name:'Chicken'};
        request.post('http://localhost:3001/api/meals')
          .type('json')
          .send({meal: meal})
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.errors[0].msg).to.equal('Error: No Name Found in Meal');
            done();
          });
      });
      it('should fail w/ without meal', (done)=>{
        const meal = {_name:'Chicken'};
        request.post('http://localhost:3001/api/meals')
          .type('json')
          .send({_meal: meal})
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.errors[0].msg).to.equal('Error: No Meal Found in Body');
            done();
          });
      });
    });
    describe('DELETE /api/meals/:id', ()=>{
      it('should delete a meal', ()=>{
        const meal = {name:'Chicken'};
        return meal_model.addMeal(meal)
          .then((_meal)=>{
            return request.delete('http://localhost:3001/api/meals/'+String(_meal._id))
              .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('msg');
                expect(res.body.msg).to.be.an('string');
              });
          });
      });
    });
  });
});
