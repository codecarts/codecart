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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav>
        <Link to="/" className="logo">
          <img src={logoImage} alt="codecart logo" />
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
            <button onClick={handleLogout} className="logout-button">Logout</button>
          ) : (
            <NavLink to="/login" className="login-button">Login</NavLink>
          )}
        </div>
        
        {/* Hamburger Icon for Mobile */}
        <button className="hamburger-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
      </nav>

      {/* Background Overlay */}
      <div className={`overlay ${isMenuOpen ? 'open' : ''}`} onClick={closeMenu}></div>

      {/* Mobile Menu Slide-out */}
      <div className={`mobile-nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <button className="close-icon" onClick={closeMenu}>×</button>
        </div>
        <NavLink to="/notes" onClick={closeMenu}>Notes</NavLink>
        <NavLink to="/pyqs" onClick={closeMenu}>PYQs</NavLink>
        <NavLink to="/blogs" onClick={closeMenu}>Blogs</NavLink>
        <NavLink to="/products" onClick={closeMenu}>Products</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
         {user ? (
          <a onClick={() => { handleLogout(); closeMenu(); }} style={{cursor: 'pointer'}}>Logout</a>
        ) : (
          <NavLink to="/login" onClick={closeMenu}>Login</NavLink>
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