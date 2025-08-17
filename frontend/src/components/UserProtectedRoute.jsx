import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext'; // Use User Auth

const UserProtectedRoute = ({ children }) => {
  const { user } = useUserAuth(); // Use User Auth

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default UserProtectedRoute;