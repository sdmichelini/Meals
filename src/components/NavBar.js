import React, { Component } from 'react'
import { Link } from 'react-router'

class NavBarComponent extends Component {
  render() {
    return (<nav className='navbar navbar-default'>
      <div className='container-fluid'>
        <div className='navbar-header'>
          <Link to='/' className='navbar-brand'>Meals</Link>
        </div>
        <ul className='navbar-nav'>
          <li><Link to='/'>Shopping List</Link></li>
        </ul>
      </div>
    </nav>)
  }
}

export default NavBarComponent;
