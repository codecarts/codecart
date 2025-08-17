import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import logoImage from '../assets/logo.png';

export const MobileNavigation = () => {
  const { user, logout } = useUserAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <nav>
      <Link to="/" className="logo">
        <img src={logoImage} alt="codecart logo" />
        <span>codecart</span>
      </Link>
      <button className="hamburger-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
      <div className={`mobile-nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <NavLink to="/notes" onClick={closeMenu}>Notes</NavLink>
        <NavLink to="/pyqs" onClick={closeMenu}>PYQs</NavLink>
        <NavLink to="/blogs" onClick={closeMenu}>Blogs</NavLink>
        <NavLink to="/products" onClick={closeMenu}>Products</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
        {user ? (
          <a onClick={handleLogout} style={{cursor: 'pointer'}}>Logout</a>
        ) : (
          <NavLink to="/login" onClick={closeMenu}>Login</NavLink>
        )}
      </div>
    </nav>
  );
};