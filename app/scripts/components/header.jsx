import React from 'react';
import { Link } from 'react-router';

const Header = (props) => {
  return (
    <header className="header">
      <nav>
        <div className="nav-item">
          <Link to="user">User List</Link>
        </div>
        <div className="nav-item">
          <Link to="group">Group List</Link>
        </div>
      </nav>
    </header>
  )
};

export default Header;