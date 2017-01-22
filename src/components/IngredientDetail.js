/*
  Detail view for a meal
*/

import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as IngredientActions from '../actions/IngredientActions'
import Store from '../Store'

import IngredientListItem from './IngredientListItem'

class IngredientDetailComponent extends Component {
  componentDidMount() {
    Store.dispatch(IngredientActions.fetchIngredients(this.props.mealId));
  }

  render() {
    let ingredients = this.props.ingredients.ingredients.filter((ingredient) => {
      return (ingredient.meal_id === this.props.mealId);
    });
    if(this.props.ingredients.loading) {
      return (
        <p className='text-muted'>Loading Ingredients...</p>
      )
    } else if(ingredients.length == 0) {
      return (
        <p className='text-muted'>No Ingredients Found for Meal</p>
      )
    } else {
      let list_items = ingredients.map((ingredient)=>{
        return (<IngredientListItem key={ingredient._id} ingredient={ingredient} />)
      });
      return (
        <div>
          <h3>Ingredients</h3>
          <ul className='ingredient-list'>
            { list_items }
          </ul>
        </div>
      )
    }

  }
}

/*
  Convert our Redux store state into props for the detail view
*/
const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients
  }
}
// Use connect to get the store values and pass them as props to the meal list component
const IngredientDetail = connect(
  mapStateToProps
)(IngredientDetailComponent);

export default IngredientDetail;
