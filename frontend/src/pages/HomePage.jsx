import React from 'react';
import { Link } from 'react-router-dom';
import { FaTelegramPlane, FaInstagram } from 'react-icons/fa'; // Import icons
import './HomePage.css';

const HomePage = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Your Ultimate Study Resource Hub</h1>
          <p> Access high-quality notes, previous year questions, and tech resources all in one place. Get the latest on ongoing hackathons, competitions, and tech-related blogs.</p>
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

      {/* Add this new section */}
      <section className="social-cta-section">
        <div className="container">
          <h2>Connect With Us</h2>
          <p>Join our communities on Telegram and Instagram to stay updated with the latest notes, announcements, and discussions.</p>
          <div className="social-links">
            <a href="https://t.me/+gv1qThOnm1YyZmE9" target="_blank" rel="noopener noreferrer">
              <FaTelegramPlane />
              <span>Telegram</span>
            </a>
            <a href="https://www.instagram.com/codecart_?igsh=MTB0em8yYmk0YzBpbA==&utm_source=ig_contact_invite" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </section>

      <section className="feedback-section">
        <div className="container">
          <h2>Have a Suggestion?</h2>
          <p>We are always looking to improve. If you have any feedback or suggestions for the website, please let us know!</p>
          <form 
            className="feedback-form"
            action="https://formspree.io/f/xgvlagno" // <-- PASTE YOUR NEW URL HERE
            method="POST"
          >
            <textarea name="feedback" placeholder="Your feedback..." required></textarea>
            <button type="submit">Send Feedback</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default HomePage;