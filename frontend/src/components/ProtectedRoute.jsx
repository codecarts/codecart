import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  if (!auth?.isAuthenticated) {
    // If user is not authenticated, redirect to the login page
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedRoute;