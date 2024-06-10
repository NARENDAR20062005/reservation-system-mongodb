import React from 'react'
import '../style/Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  
  return (
    <>
      <div className='navbar'>
          <nav>
        <ul>
            <li>
              <div className='nb'><Link to="/" > Home</Link></div> 
            </li>
            <li>
                <div className='nb'><Link to="/about">About</Link></div>
            </li>
            <li>
                <div className='nb'><Link to="/reserve">Reservation</Link></div>
            </li>
            <li>
                <div className='nb'><Link to="/view">View bookings</Link></div>
            </li>
        </ul>
        </nav> 
          </div>
    </>
  )
}

export default Navbar;