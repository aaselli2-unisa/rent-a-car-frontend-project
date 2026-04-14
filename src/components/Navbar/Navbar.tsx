import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaUser } from 'react-icons/fa';
import './Navbar.css';
import useToken from '../../utils/useToken';
import UserProfileDropdown from './UserProfileDropdown';
import { color } from '@mui/system';
import { red } from '@mui/material/colors';

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  const { token, decodedToken, updateToken, clearToken } = useToken();

  const logout = () => {
    // logout işlemi buraya eklenecek
  };

  return (
    <nav className={`navbar ${dropdownActive ? 'dropdown-open' : ''}`}>
      <div className='navbar-container'>

        <Link to='/' className='navbar-logo'>
          <span>Extend</span><span style={{color:"#8C1818"}}><b>Rent</b></span>
        </Link>

        <div className='menu-icon' onClick={toggleMenu}>
          <FaBars />
        </div>
        <ul className={`nav-menu ${menuActive ? 'active' : ''}`}>
         
            <li className='nav-item'>
              <Link to='/' className='nav-links'>
                Home
              </Link>
            </li>
          {decodedToken?.role?.some(role => role === 'ADMIN') && (
          <li className='nav-item'>
            <Link to='/adminPanel' className='nav-links'>
              Admin Panel
            </Link>
          </li>
          )}
          <li className='nav-item'>
            <Link to='/about' className='nav-links'>
              About Us
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/contact' className='nav-links'>
              Contact Us
            </Link>
          </li>
          {!decodedToken?.id && (
          <li className='nav-item nav-item-right'>
            <Link to='/login' className='nav-links nav-links-btn'>
              Login
            </Link>
          </li>
          )}
          {!decodedToken?.id && (
            <li className='nav-item nav-item-right'>
              <Link to='/signup' className='nav-links nav-links-btn'>
                Sign Up
              </Link>
            </li>
          )}
          {decodedToken?.id && (
          <li className='nav-item nav-item-right'>
            <div className="user-profile-dropdown">
            
              <UserProfileDropdown />
            </div>
          </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
