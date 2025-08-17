import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext'; // Ensure this import is correct

const AdminProtectedRoute = ({ children }) => {
  const { auth } = useAdminAuth();

  if (!auth?.isAuthenticated) {
    // If the admin is not authenticated, redirect to the admin login page
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default AdminProtectedRoute;