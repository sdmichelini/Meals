import IngredientReducer from '../reducers/Ingredient';
import IngredientConstants from '../constants/IngredientConstants';

it('should return initial state', ()=>{
  expect(
    IngredientReducer(undefined, {})
  ).toEqual({ingredients: []});
});

it('should add ingredients', () => {
  expect(IngredientReducer(undefined, {type: IngredientConstants.ADD_INGREDIENTS, ingredients: [{name: 'Test'}]}))
  .toEqual({ingredients: [{name: 'Test'}]});
});
it('should delete ingredients', () => {
  expect(IngredientReducer({ingredients: [{name: 'test', _id: 'a'}, {name: 'test', _id: 'b'}]}, {type: IngredientConstants.DELETE_INGREDIENT, id: 'b'}))
  .toEqual({ingredients: [{name: 'test', _id: 'a'}]});
});
