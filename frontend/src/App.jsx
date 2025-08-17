import { Routes, Route, NavLink, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import logoImage from './assets/logo.png'; // Make sure you have a logo.png in src/assets

// Import all pages
import HomePage from './pages/HomePage';
import NotesPage from './pages/NotesPage';
import PyqsPage from './pages/PyqsPage';
import BlogsPage from './pages/BlogsPage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AdminUploadPage from './pages/AdminUploadPage';

function Navigation() {
  const { auth, logout } = useAuth();
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
      {auth?.isAuthenticated && (
        <button onClick={handleLogout} style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}>
          Logout
        </button>
      )}
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
    <AuthProvider>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/pyqs" element={<PyqsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin/upload"
            element={<ProtectedRoute><AdminUploadPage /></ProtectedRoute>}
          />
        </Routes>
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default App;