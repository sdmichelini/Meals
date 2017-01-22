import React, { Component } from 'react';

const Header = (props) => {
  return (<div><h4>{ props.children }</h4></div>);
}

const DetailList = (props) => {
  return (<div><strong>{props.name}: </strong>{props.children}</div>);
}

export default class IngredientListItem extends Component{
  render() {
    let { ingredient } = this.props;
    if(ingredient.details) {
      return (
        <li className='ingredient-list-item'>
          <Header>{ingredient.name}</Header>
          <DetailList name='Amount'>{ingredient.amount}</DetailList>
          <DetailList name='Details'>{ingredient.details}</DetailList>
        </li>
      )
    } else {
      return (
        <li className='ingredient-list-item'>
          <Header>{ingredient.name}</Header>
          <DetailList name='Amount'>{ingredient.amount}>{ingredient.amount}</DetailList>
        </li>
      )
    }
  }
}
