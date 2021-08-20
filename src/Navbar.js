import React, { Component } from "react";
import { Link } from "react-router-dom";
import './navbar.css';

export class Navbar extends Component {
  render() {
    return (
      <div className='navbar'>
        <Link className='title' to='/'>EXERCISE TRACKER</Link>
        <ul className='menu'>
          <li><Link className='link' to='/users/add'>Create User</Link></li>
          <li><Link className='link' to='/add_exercise'>Create Exercise</Link></li>
          <li><Link className='link' to='/exercises'>Exercise List</Link></li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
