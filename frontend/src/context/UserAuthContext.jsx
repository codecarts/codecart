import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const UserAuthContext = createContext(null);

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check local storage for a token to keep the user logged in
    const token = localStorage.getItem('user_token');
    return token ? { token } : null;
  });

  const login = async (email, password) => {
    // Create form data as expected by Spring Security
    const formData = new URLSearchParams();
    formData.append('username', email); // Spring Security expects 'username'
    formData.append('password', password);

    const response = await axios.post(`${API_URL}/api/users/login`, formData);
    
    const { access_token } = response.data;
    localStorage.setItem('user_token', access_token);
    setUser({ token: access_token });
  };

  const logout = () => {
    localStorage.removeItem('user_token');
    setUser(null);
  };

  return (
    <UserAuthContext.Provider value={{ user, login, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(UserAuthContext);
};