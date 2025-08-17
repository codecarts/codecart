import { Routes, Route, NavLink, Link, useNavigate } from 'react-router-dom';

// This is the corrected import block
import { AdminAuthProvider } from './context/AdminAuthContext';
import { useAdminAuth } from './context/AdminAuthContext';
import { UserAuthProvider, useUserAuth } from './context/UserAuthContext';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import UserProtectedRoute from './components/UserProtectedRoute';

// Import your logo and all page components
import logoImage from './assets/logo.png';
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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav>
      <Link to="/" className="logo">
        <img src={logoImage} alt="codecart logo" style={{ height: '40px', marginRight: '10px' }} />
        <span style={{ fontWeight: '700' }}>codecart</span>
      </Link>
      <NavLink to="/notes">Notes</NavLink>
      <NavLink to="/pyqs">PYQs</NavLink>
      <NavLink to="/blogs">Blogs</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      
      <div style={{ marginLeft: 'auto' }}>
        {user ? (
          <button onClick={handleLogout} style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}>
            Logout
          </button>
        ) : (
          <NavLink to="/login" style={{ background: 'var(--primary-dark)', color: 'white', padding: '8px 12px', borderRadius: '5px' }}>
            Login
          </NavLink>
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
          </Routes>
        </main>
        <Footer />
      </UserAuthProvider>
    </AdminAuthProvider>
  );
}

export default App;