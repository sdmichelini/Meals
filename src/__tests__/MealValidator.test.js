import MealValidator from '../common/MealValidator'

it('should allow a proper meal', ()=>{
  const meal = {name: 'Chicken Steak'}
  expect(
    MealValidator.validateMeal(meal)
  ).toEqual(meal);
});

it('should not allow a meal w/ no name', ()=>{
  const meal = {}
  expect(
    MealValidator.validateMeal(meal)
  ).toEqual(undefined);
});

it('should not allow a meal w/ an invalid name', ()=>{
  const meal = {name:''}
  expect(
    MealValidator.validateMeal(meal)
  ).toEqual(undefined);
});
