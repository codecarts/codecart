import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import logoImage from '../assets/logo.png';

export const DesktopNavigation = () => {
  const { user, logout } = useUserAuth();

  return (
    <nav>
      <Link to="/" className="logo">
        <img src={logoImage} alt="codecart logo" />
        <span>codecart</span>
      </Link>
      <div className="desktop-nav-links">
        <NavLink to="/notes">Notes</NavLink>
        <NavLink to="/pyqs">PYQs</NavLink>
        <NavLink to="/blogs">Blogs</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </nav>
  );
};