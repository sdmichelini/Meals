/*
  Detail view for a meal
*/

import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as IngredientActions from '../actions/IngredientActions'
import Store from '../Store'

class IngredientDetailComponent extends Component {
  componentDidMount() {
    Store.dispatch(IngredientActions.fetchIngredients(this.props.mealId));
  }

  render() {
    if(this.props.ingredients.loading) {
      return (
        <p className='text-muted'>Loading Ingredients...</p>
      )
    } else if(this.props.ingredients.ingredients.length == 0) {
      return (
        <p className='text-muted'>No Ingredients Found for Meal</p>
      )
    } else {
      return (
        <p className='text-muted'>There are ingredients.</p>
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
