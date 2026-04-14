import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
interface FooterProps {

}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="footer">
      <div className="container">

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link to='/about' className='nav-links'>
              About Us
            </Link></li>
            <li><Link to='/contact' className='nav-links'>
              Contact Us
            </Link></li>
            <li><Link to='/contact' className='nav-links'>
              Careers
            </Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Privacy and Policy</h4>
          <ul>
            <li><Link to='/rentalTerm' className='nav-links'>
              Cookie Policy
            </Link></li>
            <li><Link to='/rentalTerm' className='nav-links'>
              Rental Terms
            </Link></li>
            <li><Link to='/rentalTerm' className='nav-links'>
              Privacy Policy
            </Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#"><i className="fa fa-facebook"></i></a>
            <a href="#"><i className="fa fa-twitter"></i></a>
            <a href="#"><i className="fa fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;