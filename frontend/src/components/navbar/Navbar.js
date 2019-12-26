import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <Link className="navbar-item" to="/">Home</Link>
      <Link className="navbar-item" to="/about">About</Link>
      <div className="navbar-item">
        Log In
      </div>
    </div>
  );
}

export default Navbar;
