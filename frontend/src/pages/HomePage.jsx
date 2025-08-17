import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import customBackgroundImage from '../assets/background.jpg'; // Assuming your image is here

const HomePage = () => {
  const heroStyle = {
    backgroundImage: `url(${customBackgroundImage})`
  };

  return (
    <>
      <section className="hero" style={heroStyle}>
        <div className="hero-content">
          <h1>Your Ultimate Study Resource Hub</h1>
          <p>Access high-quality notes, previous year questions, and tech resources all in one place.</p>
          <Link to="/notes" className="hero-button">Get Started</Link>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2>Our Resources</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📖</div>
              <h3>Subject Notes</h3>
              <p>Well-organized notes covering all important topics and concepts.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>PYQs Collection</h3>
              <p>Previous year question papers with solutions for exam preparation.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💻</div>
              <h3>Tech Blogs</h3>
              <p>Latest technology articles and tutorials for skill development.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎓</div>
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