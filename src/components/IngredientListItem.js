import React, { Component } from 'react';
import * as IngredientActions from '../actions/IngredientActions'
import Store from '../Store'

const Header = (props) => {
  return (<div><h4>{ props.children }</h4></div>);
}

const DetailList = (props) => {
  return (<div><strong> { props.name }: </strong>{ props.children }</div>);
}

const RightButton = (props) => {
  return (<div className='float-right'><button className={props.cls} onClick={props.onClick}>{ props.children }</button></div>);
}

export default class IngredientListItem extends Component{
  removeIngredient() {
    let { ingredient } = this.props;
    Store.dispatch(IngredientActions.removeIngredient(ingredient._id));
  }
  render() {
    let { ingredient } = this.props;
    if(ingredient.details) {
      return (
        <li className='ingredient-list-item'>
          <RightButton cls='btn btn-danger' onClick={this.removeIngredient.bind(this)}>Delete</RightButton>
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
