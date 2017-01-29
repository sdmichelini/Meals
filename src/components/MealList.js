import React, { Component } from 'react'

import MealListItem from './MealListItem'
import NewMealForm from './NewMealForm'
import * as MealActions from '../actions/MealActions'
import Store from '../Store'

import { connect } from 'react-redux'

class MealListComponent extends Component {
  componentDidMount() {
    Store.dispatch(MealActions.fetchMeals());
  }
  render() {
    const meals = this.props.meals.map((meal)=> {
      return (<MealListItem meal={meal} key={meal._id}></MealListItem>)
    })
    return (
      <div>
        <h1>Meal Repository</h1>
        <ul className='meal-list'>
          { meals }
        </ul>
        <NewMealForm />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    meals: state.meals.meals
  }
}
// Use connect to get the store values and pass them as props to the meal list component
const MealList = connect(
  mapStateToProps
)(MealListComponent);

export default MealList;
