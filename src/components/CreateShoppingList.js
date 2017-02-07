/*
  Shopping creation page
*/

import React, { Component } from 'react';

import * as ShoppingListActions from '../actions/ShoppingListActions'
import Store from '../Store'

const initialState = {
  name: '',
  formHidden: true // Show or hide the form
};

export default class CreateShoppingList extends Component {
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

  createShoppingList(e) {

  }

  onNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  render() {
    if(this.state.formHidden) {
      return (<button className='btn btn-success' onClick={this.toggleForm.bind(this)}>Add Shopping List</button>);
    } else {
      return (
        <div>
          <button className='btn btn-danger' onClick={this.toggleForm.bind(this)}>Cancel Shopping List</button>
          <form onSubmit={this.createShoppingList.bind(this)}>
            Name:
            <input type='text' className='form-control' value={this.state.name} onChange={this.onNameChange.bind(this)} required/>

            <button type='submit' className='btn btn-success' onClick={this.createShoppingList.bind(this)}>Add Shopping List</button>
          </form>
        </div>
      );
    }
  }
}
