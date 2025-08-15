import { useState, useEffect } from 'react';
import { getBlogs } from '../services/api';
import './BlogsPage.css'; // Import the new CSS
import { FilterBar } from '../components/FilterBar'; // A new reusable component

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs()
      .then(response => {
        setBlogs(response.data);
        setFilteredBlogs(response.data); // Initialize filtered list
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch blogs:", error);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (searchTerm) => {
    const filtered = blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(filtered);
  };

  if (loading) return <p className="page-header">Loading blogs...</p>;

  return (
    <div>
      <div className="page-header">
        <h1>Latest Blog Posts</h1>
        <FilterBar onFilterChange={handleFilterChange} placeholder="Filter blogs by title..." />
      </div>
      <div className="blog-list">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map(blog => (
            <div key={blog.id} className="blog-post-card">
              <h2>{blog.title}</h2>
              <p>By {blog.author}</p>
              <a href={blog.gdrive_link} target="_blank" rel="noopener noreferrer">
                Read More →
              </a>
            </div>
          ))
        ) : (
          <p>No blogs match your search.</p>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;