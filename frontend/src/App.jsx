import { Routes, Route, NavLink, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import logoImage from './assets/logo.png'; // Make sure your logo is named logo.png
// Import all pages
import HomePage from './pages/HomePage';
import NotesPage from './pages/NotesPage';
import PyqsPage from './pages/PyqsPage';
import BlogsPage from './pages/BlogsPage';
import ProductsPage from './pages/ProductsPage'; // New
import ContactPage from './pages/ContactPage';   // New
import LoginPage from './pages/LoginPage';
import AdminUploadPage from './pages/AdminUploadPage';

function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 codecart | Curated with care for students.</p>
    </footer>
  );
}

function Navigation() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav>
      <Link to="/" className="logo">
        <img src={logoImage} alt="codecart logo" style={{ height: '40px', marginRight: '10px' }} />
        {/* Add the site name in a span for styling */}
        <span style={{ fontWeight: '700', fontSize: '1.5rem' }}>codecart</span>
      </Link>
      
      {/* The rest of the nav links remain the same */}
      <NavLink to="/notes">Notes</NavLink>
      <NavLink to="/pyqs">PYQs</NavLink>
      <NavLink to="/blogs">Blogs</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <NavLink to="/admin/upload">Admin</NavLink>

      {auth?.isAuthenticated && (
        <button onClick={handleLogout} style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}>
          Logout
        </button>
      )}
    </nav>
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
          <Route path="/products" element={<ProductsPage />} /> {/* New */}
          <Route path="/contact" element={<ContactPage />} />   {/* New */}
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