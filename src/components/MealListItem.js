import React, { Component } from 'react';

import { Link } from 'react-router'

/*
  A meal list item
*/
export default class MealListItem extends Component {

  render() {
    console.log('/meals/'+String(this.props.meal._id));
    return (
      <li><Link to={'/meals/'+String(this.props.meal._id)}>{ this.props.meal.name }</Link></li>
    )
  }
}
