import React, { Component } from 'react'
import { Link } from 'react-router'

class NavBarComponent extends Component {
  render() {
    return (
      <nav className='navbar-custom'>
        <ul className='nav-list'>
          <li className='nav-list-item header'><Link to='/'>Meals</Link></li>
          <li className='nav-list-item'><Link to='/'>Lists</Link></li>
          <li className='nav-list-item'><Link to='/'>Ratings</Link></li>
        </ul>
    </nav>)
  }
}

export default NavBarComponent;
