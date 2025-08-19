import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Added the missing Link import
import { createResource, createBlog, createProduct } from '../services/api';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminUploadPage = () => {
  const [formType, setFormType] = useState('resource');
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { auth } = useAdminAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth?.credentials) {
      setMessage('Error: Not authenticated.');
      return;
    }
    setLoading(true);
    setMessage('Uploading...');
    try {
      let response;
      if (formType === 'resource') {
        response = await createResource(formData, auth.credentials);
      } else if (formType === 'blog') {
        response = await createBlog(formData, auth.credentials);
      } else {
        response = await createProduct(formData, auth.credentials);
      }
      setMessage(`Success! Created with ID: ${response.data.id}`);
      e.target.reset();
      setFormData({});
    } catch (error) {
      const errorMsg = error.response?.data?.detail || 'An error occurred during upload.';
      setMessage(`Error: ${errorMsg}`);
    } finally {
        setLoading(false);
    }
  };

  const renderForm = () => {
    switch (formType) {
      case 'blog':
        return (
          <>
            <h2>Upload a New Blog</h2>
            <input name="title" placeholder="Blog Title" onChange={handleInputChange} required />
            <input name="author" placeholder="Author Name" defaultValue="Admin" onChange={handleInputChange} required />
            <input name="gdrive_link" placeholder="Google Drive Link" onChange={handleInputChange} required />
          </>
        );
      case 'product':
        return (
          <>
            <h2>Upload a New Product Recommendation</h2>
            <input name="name" placeholder="Product Name" onChange={handleInputChange} required />
            <textarea name="description" placeholder="Product Description" onChange={handleInputChange}></textarea>
            <input name="image_url" placeholder="Image URL (optional)" onChange={handleInputChange} />
            <input name="affiliate_link" placeholder="Affiliate Link" onChange={handleInputChange} required />
          </>
        );
      default: // 'resource'
        return (
          <>
            <h2>Upload a New Note or PYQ</h2>
            <select name="resource_type" onChange={handleInputChange} required>
              <option value="">-- Select Type --</option>
              <option value="note">Note</option>
              <option value="pyq">PYQ</option>
            </select>
            <input name="category" placeholder="Subject/Category (e.g., Engineering Physics)" onChange={handleInputChange} required />
            <input name="title" placeholder="Resource Title" onChange={handleInputChange} required />
            <textarea name="description" placeholder="Short Description" onChange={handleInputChange}></textarea>
            <input name="gdrive_link" placeholder="Google Drive Link" onChange={handleInputChange} required />
          </>
        );
    }
  };

  return (
    <div className="container" style={{paddingTop: '2rem', paddingBottom: '2rem'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'}}>
        <h1 style={{margin: 0}}>Admin Upload Panel</h1>
        <Link to="/admin/messages" style={{fontWeight: 600}}>View Contact Messages</Link>
      </div>
      
      <div style={{ margin: '2rem 0', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button onClick={() => setFormType('resource')}>Upload Note/PYQ</button>
        <button onClick={() => setFormType('blog')}>Upload Blog</button>
        <button onClick={() => setFormType('product')}>Upload Product</button>
      </div>
      
      <form onSubmit={handleSubmit} className="admin-form">
        {renderForm()}
        <button type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
            {loading ? 'Uploading...' : 'Upload'}
        </button>
        {message && <p style={{textAlign: 'center', marginTop: '1rem'}}>{message}</p>}
      </form>
    </div>
  );
};

export default AdminUploadPage;