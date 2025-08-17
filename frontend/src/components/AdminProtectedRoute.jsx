import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext'; // Use Admin Auth

const AdminProtectedRoute = ({ children }) => {
  const { auth } = useAdminAuth(); // Use Admin Auth

  if (!auth?.isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default AdminProtectedRoute;