import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

// This is the section to replace with the new, verified links.
const notesIcon = "https://api.iconify.design/solar/document-text-linear.svg";
const pyqsIcon = "https://api.iconify.design/solar/notebook-bookmark-linear.svg";
const blogsIcon = "https://api.iconify.design/solar/pen-new-square-linear.svg";
const guidesIcon = "https://api.iconify.design/solar/user-id-linear.svg";

const HomePage = () => {
  return (
    <>
      {/* --- Hero Section --- */}
      <section className="hero">
        <div className="hero-content">
          <h1>Your Ultimate Study Resource Hub</h1>
          <p>
            Access high-quality notes, previous year questions, and tech resources all in
            one place.
          </p>
          <Link to="/notes" className="hero-button">
            Get Started
          </Link>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section className="features-section">
        <div className="container">
          <h2>Our Resources</h2>
          <div className="features-grid">
            <div className="feature-card">
              <img src={notesIcon} alt="Subject Notes Icon" />
              <h3>Subject Notes</h3>
              <p>Well-organized notes covering all important topics and concepts.</p>
            </div>
            <div className="feature-card">
              <img src={pyqsIcon} alt="PYQs Collection Icon" />
              <h3>PYQs Collection</h3>
              <p>Previous year question papers with solutions for exam preparation.</p>
            </div>
            <div className="feature-card">
              <img src={blogsIcon} alt="Tech Blogs Icon" />
              <h3>Tech Blogs</h3>
              <p>Latest technology articles and tutorials for skill development.</p>
            </div>
            <div className="feature-card">
              <img src={guidesIcon} alt="Study Guides Icon" />
              <h3>Study Guides</h3>
              <p>Effective learning strategies and exam preparation tips.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;