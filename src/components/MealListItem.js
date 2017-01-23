import React, { Component } from 'react';

import { Link } from 'react-router'
import Store from '../Store'
import * as MealActions from '../actions/MealActions'

/*
  A meal list item
*/
export default class MealListItem extends Component {
  onDelete() {
    Store.dispatch(MealActions.deleteMealFromServer(this.props.meal._id));
  }

  render() {
    return (
      <li className='meal-list-item'>
        <h4 className='header-inline'><Link to={'/meals/'+String(this.props.meal._id)}>{ this.props.meal.name }</Link></h4>
        <div className='float-right'>
          <button onClick={this.onDelete.bind(this)} className='btn btn-danger'>Delete</button>
        </div>
      </li>
    )
  }
}
