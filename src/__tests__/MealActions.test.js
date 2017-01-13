import MealReducer from '../reducers/Meal';
import * as MealActions from '../actions/MealActions';

it('should add a meal', ()=>{
  expect(
    MealReducer(undefined, MealActions.addMeals([{name: 'Penne'}]))
  ).toEqual({meals:[{name: 'Penne'}]});
});

it('should add multiple meals', ()=>{
  expect(
    MealReducer(undefined, MealActions.addMeals([{name: 'Penne'},{name:'Chicken'}]))
  ).toEqual({meals:[{name: 'Penne'},{name:'Chicken'}]});
});

it('should edit a meals name', ()=>{
  expect(
    MealReducer({meals:[{name: 'Penne', _id:1}]}, MealActions.editMeal(1,'Chicken'))
  ).toEqual({meals:[{name: 'Chicken', _id:1}]});
});

it('should not edit a meal if meal id not found', ()=>{
  expect(
    MealReducer({meals:[{name: 'Penne', _id:1}]}, MealActions.editMeal(2,'Chicken'))
  ).toEqual({meals:[{name: 'Penne', _id:1}]});
});

it('should delete a meal', ()=>{
  expect(
    MealReducer({meals:[{name: 'Penne', _id:1}]}, MealActions.deleteMeal(1))
  ).toEqual({meals:[]});
});
