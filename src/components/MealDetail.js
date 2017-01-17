/*
  Detail view for a meal
*/

import React, { Component } from 'react';
import { connect } from 'react-redux'

class MealDetailComponent extends Component {

  render() {
    const meal = this.props.meals.filter((meal)=>{
      return (this.props.params.id == meal._id)
    })[0];
    if(meal) {
      return (
        <div>
          <h1>{ meal.name }</h1>
          <p className='text-muted'>{'Loading Ingrediants...'}</p>
          <p className='text-muted'>{'Loading Reviews...'}</p>
        </div>
      )
    } else {
      return (
        <div className='alert alert-danger' role='alert'>{'Could Not Find Meal with ID: '+this.props.params.id}</div>
      )
    }

  }
}
/*
  Convert our Redux store state into props for the detail view
*/
const mapStateToProps = (state) => {
  return {
    meals: state.meals
  }
}
// Use connect to get the store values and pass them as props to the meal list component
const MealDetail = connect(
  mapStateToProps
)(MealDetailComponent);

export default MealDetail;
