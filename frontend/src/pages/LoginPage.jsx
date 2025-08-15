import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '', secretKey: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(credentials);
      // On successful login, navigate to the upload page
      navigate('/admin/upload');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <h3>Enter Credentials to Continue</h3>
        <input type="email" name="email" placeholder="Admin Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Admin Password" onChange={handleChange} required />
        <input type="password" name="secretKey" placeholder="Admin Secret Key" onChange={handleChange} required />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;