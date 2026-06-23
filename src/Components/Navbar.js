import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={require("../images/rentalhub-logo-removebg-preview.png")} alt="RentalHub Logo" width={220} height={50} />
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className={`nav-link ${currentPath === '/' ? 'active' : ''}`} to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${currentPath === '/fleet' ? 'active' : ''}`} to="/fleet">Fleet</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${currentPath === '/about' ? 'active' : ''}`} to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${currentPath === '/team' ? 'active' : ''}`} to="/team">Team</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${currentPath === '/bookings' ? 'active' : ''}`} to="/bookings">My Bookings</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${currentPath === '/contact' ? 'active' : ''}`} to="/contact">Contact Us</Link>
              </li>
              
              {/* Theme Toggle Button */}
              <li className="nav-item theme-toggle-nav-item" style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                <button 
                  onClick={toggleTheme} 
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '18px',
                    cursor: 'pointer',
                    outline: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '5px'
                  }}
                  title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
                  aria-label="Toggle Theme"
                >
                  {theme === 'dark' ? '☀️' : '🌙'}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;