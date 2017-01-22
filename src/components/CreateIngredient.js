/*
  Meal creation page
*/

import React, { Component } from 'react';

import * as IngredientActions from '../actions/IngredientActions'
import Store from '../Store'

const initialState = {
  name: '',
  amount: '',
  details: '',
  formHidden: true // Show or hide the form
};

export default class CreateIngredient extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  toggleForm() {
    let curState = this.state.formHidden;
    this.setState({
      formHidden: !curState
    });
  }

  createIngredient(e) {
    e.preventDefault();
    if(this.state.name.length < 1) {
      alert('Name Required.');
      return;
    }
    if(this.state.amount.length < 1) {
      alert('Amount Required.');
      return;
    }
    this.setState(initialState);
    Store.dispatch(IngredientActions.saveIngredient({name: this.state.name, amount: this.state.amount, details: this.state.details, meal_id: this.props.mealId}));
  }

  onNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  onAmountChange(e) {
    this.setState({
      amount: e.target.value
    });
  }

  onDetailsChange(e) {
    this.setState({
      details: e.target.value
    });
  }

  render() {
    if(this.state.formHidden) {
      return (<button className='btn btn-success' onClick={this.toggleForm.bind(this)}>Add Ingredient</button>);
    } else {
      return (
        <div>
          <button className='btn btn-danger' onClick={this.toggleForm.bind(this)}>Cancel Ingredient</button>
          <form onSubmit={this.createIngredient.bind(this)}>
            Name:
            <input type='text' className='form-control' value={this.state.name} onChange={this.onNameChange.bind(this)} required/>
            Amount:
            <input type='text' className='form-control' value={this.state.amount} onChange={this.onAmountChange.bind(this)} required/>
            Details <span className='text-muted'>Where it should be bought, etc.</span>:
            <input type='text' className='form-control' value={this.state.details} onChange={this.onDetailsChange.bind(this)}/>
            <button type='submit' className='btn btn-success' onClick={this.createIngredient.bind(this)}>Add Ingredient</button>
          </form>
        </div>
      );
    }
  }
}
