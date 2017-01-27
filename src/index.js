import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MealDetail from './components/MealDetail';
import './index.css';

import { Router, Route, hashHistory } from 'react-router'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import { Provider } from 'react-redux'
import Store from './Store'

ReactDOM.render(
  <Provider store={ Store }>
    <div className='container-fluid'>
      <Router history={hashHistory}>
        <Route path='/' component={App}/>
        <Route path='/meals/:id' component={MealDetail}/>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
);
