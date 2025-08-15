import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Get initial state from sessionStorage to persist login across page reloads
  const [auth, setAuth] = useState(() => {
    const storedAuth = sessionStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth) : null;
  });

  const login = async (credentials) => {
    // Call the new backend endpoint to verify credentials
    await axios.post('http://127.0.0.1:8000/api/admin/verify', credentials);
    
    // If the request succeeds, store credentials and set auth state
    const authData = { isAuthenticated: true, credentials };
    setAuth(authData);
    sessionStorage.setItem('auth', JSON.stringify(authData));
  };

  const logout = () => {
    setAuth(null);
    sessionStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};