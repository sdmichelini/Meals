import React, { Component } from 'react';

/*
  A meal list item
*/
export default class MealListItem extends Component {

  render() {
    return (
      <li>{ this.props.meal.name }</li>
    )
  }
}
