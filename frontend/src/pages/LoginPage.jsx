import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// This is the corrected import path and hook
import { useAdminAuth } from '../context/AdminAuthContext'; 

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAdminAuth(); // Use the correct auth hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(credentials);
      navigate('/admin/upload');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Admin Login</h1>
      </div>
      <form onSubmit={handleSubmit} className="admin-form">
        <h3>Enter Credentials to Continue</h3>
        <input type="email" name="email" placeholder="Admin Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Admin Password" onChange={handleChange} required />
        <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;