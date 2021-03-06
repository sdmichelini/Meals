import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import MealList from './components/MealList'
import MealDetail from './components/MealDetail'
import ShoppingLists from './components/ShoppingLists'
import './index.css';

import { Router, Route, IndexRoute,hashHistory } from 'react-router'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import { Provider } from 'react-redux'
import Store from './Store'

ReactDOM.render(
  <Provider store={ Store }>
    <div className='container-fluid'>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={MealList} />
          <Route path='/meals/:id' component={MealDetail} />
          <Route path='/shopping-lists' component={ShoppingLists} />
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
);
