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
    // TODO: Get MongoDB to Generate ID
    const meal = {name: this.state.name, _id: Date.now()};
    Store.dispatch(MealActions.addMealToServer(meal));
    this.setState({
      name: ''
    });
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
        <input type='text' className='form-control' value={this.state.name} onChange={this.onNameChange.bind(this)}/>

        <button className='btn btn-success' type='submit'>Create Meal</button>
      </form>
    )
  }
}
