import React, { Component } from 'react';

import Store from '../Store'
import * as MealActions from '../actions/MealActions'

/*
  A meal form that will create a meal.
*/
export default class NewMealForm extends Component {
  constructor() {
    super();
    this.state = {
      name: ''//Name of the meal
    }
  }

  /*
    Event Handler for Meal Submission
  */
  onMealSubmit(e) {
    //Don't let page reload
    e.preventDefault();
    const meals = [{name: this.state.name, id: 1}];
    Store.dispatch(MealActions.addMeals(meals));
  }

  /*
    When the meal name is changed this is fired
  */
  onNameChange(e) {
    this.setState({
      name: e.target.value
    })
  }

  render() {
    return (
      <form onSubmit={this.onMealSubmit.bind(this)}>
        Name:
        <input type='text' value={this.state.name} onChange={this.onNameChange.bind(this)}/>

        <button type='submit'>Create Meal</button>
      </form>
    )
  }
}
