import React from "react";
import logo from '../pictures/logo.png'
import { NavLink } from 'react-router-dom'

function Nav() {

  return (
    <div className='navbar'>
      <nav ><img className='logo' src={logo} alt='logo' />
        <ul className='navItems'>
          <NavLink to='/house' className='nav-link'>
            <li>Houses</li>
          </NavLink>
          <NavLink to='/about' className='nav-link'>
            <li>About</li>
          </NavLink>

        </ul>
      </nav>
    </div>

  )

}
export default Nav;