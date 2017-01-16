import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import MealList from './components/MealList'

import { Provider } from 'react-redux'

import Store from './Store'

class App extends Component {
  render() {
    return (

      <Provider store={ Store }>
        <MealList />
      </Provider>
    );
  }
}

export default App;
