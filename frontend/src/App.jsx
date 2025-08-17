import React, { useState } from 'react';
import { Routes, Route, NavLink, Link, useNavigate } from 'react-router-dom';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { UserAuthProvider, useUserAuth } from './context/UserAuthContext';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import UserProtectedRoute from './components/UserProtectedRoute';
import logoImage from './assets/logo.png';
import './Mobile.css';

// Import all pages
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
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
      
      <button className="hamburger-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>

      <div className={`mobile-nav-menu ${isMenuOpen ? 'open' : ''}`}>
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
    </nav>
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
            <Route path="/" element={<HomePage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/pyqs" element={<PyqsPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/contact" element={<UserProtectedRoute><ContactPage /></UserProtectedRoute>} />
            <Route path="/login" element={<UserLoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin/upload"
              element={<AdminProtectedRoute><AdminUploadPage /></AdminProtectedRoute>}
            />
          </Routes>
        </main>
        <Footer />
      </UserAuthProvider>
    </AdminAuthProvider>
  );
}

export default App;