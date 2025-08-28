import React, { useState } from 'react';
import { Routes, Route, NavLink, Link, useNavigate } from 'react-router-dom';

// Import all contexts and protected route components
import { AdminAuthProvider } from './context/AdminAuthContext';
import { UserAuthProvider, useUserAuth } from './context/UserAuthContext';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import UserProtectedRoute from './components/UserProtectedRoute';

// Import your logo and all page components
import logoImage from './assets/logo.png'; // Make sure you have a logo.png in src/assets
import './Mobile.css'; // The CSS for the mobile navigation

import HomePage from './pages/HomePage';
import NotesPage from './pages/NotesPage';
import PyqsPage from './pages/PyqsPage';
import BlogsPage from './pages/BlogsPage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/LoginPage';
import AdminUploadPage from './pages/AdminUploadPage';
import UserLoginPage from './pages/UserLoginPage';
import RegisterPage from './pages/RegisterPage';
import ContactMessagesPage from './pages/ContactMessagesPage';

function Navigation() {
  const { user, logout } = useUserAuth();
  const navigate = useNavigate();
  const [is_menu_open, set_is_menu_open] = useState(false);

  const handle_logout = () => {
    logout();
    navigate('/');
  };
  
  const close_menu = () => set_is_menu_open(false);

  return (
    <>
      <nav>
        <Link to="/" className="logo">
          <img src={logo_image} alt="codecart logo" />
          <span>codecart</span>
        </Link>
        
        {/* Desktop Links */}
        <div className="desktop-nav-links">
          <NavLink to="/notes">Notes</NavLink>
          <NavLink to="/pyqs">PYQs</NavLink>
          <NavLink to="/blogs">Blogs</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          {user ? (
            <button onClick={handle_logout}>Logout</button>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </div>
        
        {/* Hamburger Icon for Mobile (now always shows the icon) */}
        <button className="hamburger-icon" onClick={() => set_is_menu_open(!is_menu_open)}>
          ☰
        </button>
      </nav>

      {/* Background Overlay */}
      <div className={`overlay ${is_menu_open ? 'open' : ''}`} onClick={close_menu}></div>

      {/* Mobile Menu Slide-out */}
      <div className={`mobile-nav-menu ${is_menu_open ? 'open' : ''}`}>
        <div className="mobile-nav-header">
           {/* The "Home" title is now here */}
          <div className="mobile-nav-title">Home</div>
          <button className="close-icon" onClick={close_menu}>×</button>
        </div>
        <NavLink to="/notes" onClick={close_menu}>Notes</NavLink>
        <NavLink to="/pyqs" onClick={close_menu}>PYQs</NavLink>
        <NavLink to="/blogs" onClick={close_menu}>Blogs</NavLink>
        <NavLink to="/products" onClick={close_menu}>Products</NavLink>
        <NavLink to="/contact" onClick={close_menu}>Contact</NavLink>
         {user ? (
          <a onClick={() => { handle_logout(); close_menu(); }} style={{cursor: 'pointer'}}>Logout</a>
        ) : (
          <NavLink to="/login" onClick={close_menu}>Login</NavLink>
        )}
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 codecart | Curated with care for students.</p>
    </footer>
  );
}

function App() {
  return (
    <AdminAuthProvider>
      <UserAuthProvider>
        <Navigation />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/pyqs" element={<PyqsPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            
            {/* User Auth Routes */}
            <Route path="/login" element={<UserLoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected User Route */}
            <Route
              path="/contact"
              element={<UserProtectedRoute><ContactPage /></UserProtectedRoute>}
            />

            {/* Admin Routes (hidden but accessible via URL) */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin/upload"
              element={<AdminProtectedRoute><AdminUploadPage /></AdminProtectedRoute>}
            />
            <Route
              path="/admin/messages"
              element={<AdminProtectedRoute><ContactMessagesPage /></AdminProtectedRoute>}
            />
          </Routes>
        </main>
        <Footer />
      </UserAuthProvider>
    </AdminAuthProvider>
  );
}

export default App;