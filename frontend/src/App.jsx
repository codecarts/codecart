import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { UserAuthProvider } from './context/UserAuthContext';
import { useMediaQuery } from './hooks/useMediaQuery';

// Import the separate navigation components
import { DesktopNavigation } from './components/DesktopNavigation';
import { MobileNavigation } from './components/MobileNavigation';

// Import all page and protected route components
import ContactMessagesPage from './pages/ContactMessagesPage';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import UserProtectedRoute from './components/UserProtectedRoute';
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

function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 codecart | Curated with care for students.</p>
    </footer>
  );
}

function App() {
  // Check if the screen is desktop-sized (769px or wider)
  const isDesktop = useMediaQuery('(min-width: 769px)');

  return (
    <AdminAuthProvider>
      <UserAuthProvider>
        {/* Conditionally render the correct navigation */}
        {isDesktop ? <DesktopNavigation /> : <MobileNavigation />}
        
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

            {/* The duplicate route has been removed from here */}
            
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