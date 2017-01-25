import React, { Component } from 'react'
import { Link } from 'react-router'

class NavBarComponent extends Component {
  render() {
    return (<nav className="navbar navbar-light bg-faded">
              <Link className="navbar-brand" to='/'>Navbar</Link>
            </nav>)
  }
}

export default NavBarComponent;
