import React from 'react';
import './ContributePage.css';

const ContributePage = () => {
    return (
        <section className="contribute-section">
            <div className="contribute-container">
                <h1>Help Us Grow</h1>
                <p>Have notes, guides, or question papers you'd like to share? We'd love your contribution! Click the button below to open the contribution form.</p>
                
                {/* Replace the iframe with this styled link */}
                <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdFILw78qsGMplOrh19-y5P9VSyBKbIGUiIWpeMLC5-SAtjkQ/viewform?usp=header" // <-- PASTE YOUR GOOGLE FORM URL HERE
                    className="google-form-button"
                    target="_blank" // This opens the form in a new tab
                    rel="noopener noreferrer"
                >
                    Share Resources Form
                </a>
            </div>
        </section>
    );
};

export default ContributePage;