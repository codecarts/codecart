import { createContext, useState, useContext } from 'react';
import { verifyAdmin } from '../services/api';

const AdminAuthContext = createContext(null);

// The component has been correctly named 'AdminAuthProvider' here
export const AdminAuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = sessionStorage.getItem('admin_auth');
    return storedAuth ? JSON.parse(storedAuth) : null;
  });

  const login = async (credentials) => {
    await verifyAdmin(credentials); 
    
    const authData = { isAuthenticated: true, credentials };
    setAuth(authData);
    sessionStorage.setItem('admin_auth', JSON.stringify(authData));
  };

  const logout = () => {
    setAuth(null);
    sessionStorage.removeItem('admin_auth');
  };

  return (
    <AdminAuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};