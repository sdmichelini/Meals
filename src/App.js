import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import MealList from './components/MealList'
import NavBar from './components/NavBar'




class App extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <NavBar />
        { this.props.children }
      </div>
    );
  }
}

export default App;
