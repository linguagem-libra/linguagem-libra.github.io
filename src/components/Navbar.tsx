import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <ul>
          <li>Libra</li>
          <li>Baixar</li>
          <li>Documentação</li>
          <li>Experimentar</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
