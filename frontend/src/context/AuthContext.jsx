import { createContext, useState, useContext } from 'react';
import { verifyAdmin } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = sessionStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth) : null;
  });

  const login = async (credentials) => {
    await verifyAdmin(credentials); // This will throw an error if it fails
    
    const authData = { isAuthenticated: true, credentials: { email: credentials.email, password: credentials.password } };
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

export const useAuth = () => {
  return useContext(AuthContext);
};