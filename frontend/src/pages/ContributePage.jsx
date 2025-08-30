import React from 'react';
import './ContributePage.css';

const ContributePage = () => {
    return (
        <section className="contribute-section">
            <div className="contribute-container">
                <h1>Help Us Grow</h1>
                <p>Have notes, guides, or question papers you'd like to share? We'd love your contribution! Please use the form below to send us your files.</p>
                
                <div className="google-form-container">
                    <iframe 
                        src="https://forms.gle/AFyfg2W3bo4timbH8" // <-- PASTE YOUR GOOGLE FORM URL HERE
                        width="640" 
                        height="1200" // Increased height for more fields
                        frameBorder="0" 
                        marginHeight="0" 
                        marginWidth="0"
                    >
                        Loading…
                    </iframe>
                </div>
            </div>
        </section>
    );
};

export default ContributePage;