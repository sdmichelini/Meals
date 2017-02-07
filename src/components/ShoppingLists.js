import React, { Component } from 'react'
import { connect } from 'react-redux'
import Store from '../Store'

import * as ShoppingListActions from '../actions/ShoppingListActions'

/*
  This component will render the shopping lists
*/

/*
  We are fetching the shopping lists
*/
const FetchingLists = () => {
  return (<p className='text-muted'>
    { 'We are fetching the shopping lists...' }
  </p>)
}

const FetchFailure = () => {
  return (<div className='alert alert-danger' role='alert'>
            <strong>Oh no!</strong> We could not load any lists.
          </div>)
}

class ShoppingLists extends Component {
  componentDidMount() {
    Store.dispatch(ShoppingListActions.fetchLists());
  }
  render() {
    if(this.props.loading){
      return (<FetchingLists />)
    } else if(this.props.error) {
      return (<FetchFailure />)
    } else {
      return <p>How did this happen?</p>
    }

  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    lists: state.shoppingLists.lists,
    loading: state.shoppingLists.loading,
    error: state.shoppingLists.error
  }
}

// Use connect to get the store values and pass them as props to the meal list component
const ShoppingListsComponent = connect(
  mapStateToProps
)(ShoppingLists);

export default ShoppingListsComponent;
