import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

// Using real, working icon URLs from svgrepo.com
const notesIcon = "https://www.svgrepo.com/show/532556/document-text.svg";
const pyqsIcon = "https://www.svgrepo.com/show/532508/question-answer.svg";
const blogsIcon = "https://www.svgrepo.com/show/532409/edit-pen.svg";
const productsIcon = "https://www.svgrepo.com/show/532448/package.svg";

const HomePage = () => {
  return (
    <>
      <div className="container">
        {/* Mobile Search Bar */}
        <input type="text" placeholder="Search for notes, blogs..." className="mobile-search-bar" />
      </div>

      {/* --- Hero Section (Banner for mobile) --- */}
      <section className="hero">
        <div className="hero-content">
          <h1>Your Ultimate Study Resource Hub</h1>
          <p>Access high-quality notes, previous year questions, and tech resources all in one place.</p>
          <Link to="/notes" className="hero-button">Get Started</Link>
        </div>
      </section>

      {/* --- Category Grid Section --- */}
      <section className="container">
        <div className="category-grid">
          <Link to="/notes" className="category-icon">
            <img src={notesIcon} alt="Notes" />
            <span>Notes</span>
          </Link>
          <Link to="/pyqs" className="category-icon">
            <img src={pyqsIcon} alt="PYQs" />
            <span>PYQs</span>
          </Link>
          <Link to="/blogs" className="category-icon">
            <img src={blogsIcon} alt="Blogs" />
            <span>Blogs</span>
          </Link>
          <Link to="/products" className="category-icon">
            <img src={productsIcon} alt="Products" />
            <span>Products</span>
          </Link>
        </div>
      </section>
      
      {/* You can add horizontally scrolling "Deals For You" sections here later */}
    </>
  );
};

export default HomePage;