import React, { Component } from 'react'

import MealListItem from './MealListItem'
import NewMealForm from './NewMealForm'

import { connect } from 'react-redux'

class MealListComponent extends Component {
  render() {
    const meals = this.props.meals.map((meal)=> {
      return (<MealListItem meal={meal} key={meal.id}></MealListItem>)
    })
    return (
      <div>
        <h1>Meal List</h1>
        <ul>
          { meals }
        </ul>
        <NewMealForm />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    meals: state.meals
  }
}
// Use connect to get the store values and pass them as props to the meal list component
const MealList = connect(
  mapStateToProps
)(MealListComponent);

export default MealList;
