import MealReducer from '../reducers/Meal';
import MealConstants from '../constants/MealConstants';

it('should return initial state', ()=>{
  expect(
    MealReducer(undefined, {})
  ).toEqual([]);
});

it('should add a meal', ()=>{
  expect(
    MealReducer(undefined, {
      type: MealConstants.ADD_MEALS,
      meals: [{name: 'Penne'}]
    })
  ).toEqual([{name: 'Penne'}]);
});

it('should add multiple meals', ()=>{
  expect(
    MealReducer(undefined, {
      type: MealConstants.ADD_MEALS,
      meals: [{name: 'Penne'},{name:'Chicken'}]
    })
  ).toEqual([{name: 'Penne'},{name:'Chicken'}]);
});

it('should edit a meals name', ()=>{
  expect(
    MealReducer([{name: 'Penne', _id:1}], {
      type: MealConstants.EDIT_MEAL,
      id: 1,
      name: 'Chicken'
    })
  ).toEqual([{name: 'Chicken', _id:1}]);
});

it('should not edit a meal if meal id not found', ()=>{
  expect(
    MealReducer([{name: 'Penne', _id:1}], {
      type: MealConstants.EDIT_MEAL,
      id: 2,
      name: 'Chicken'
    })
  ).toEqual([{name: 'Penne', _id:1}]);
});

it('should delete a meal', ()=>{
  expect(
    MealReducer([{name: 'Penne', _id:1}], {
      type: MealConstants.DELETE_MEAL,
      id: 1
    })
  ).toEqual([]);
});
