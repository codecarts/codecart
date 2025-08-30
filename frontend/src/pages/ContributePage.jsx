import React from 'react';
import './ContributePage.css'; // We'll create this next

const ContributePage = () => {
    return (
        <section className="contribute-section">
            <div className="contribute-container">
                <h1>Help Us Grow</h1>
                <p>Have notes, guides, or question papers you'd like to share? We'd love your contribution! Fill out the form below to send us your files.</p>
                
                <form 
                  className="contribute-form" 
                  action="https://formspree.io/f/mvgbkjan" // <-- PASTE YOUR NEW URL HERE
                  method="POST"
                  encType="multipart/form-data" // Very important for file uploads
                >
                    <input type="text" name="name" placeholder="Your Name" required />
                    <input type="email" name="email" placeholder="Your Email" required />
                    <textarea name="message" placeholder="Brief description of the notes/pyq. Min 1 & Max-250 words" required></textarea>
                    
                    <label htmlFor="file-upload" className="file-upload-label">
                        Select File to Upload
                    </label>
                    <input id="file-upload" type="file" name="upload" required />

                    <button type="submit">Submit Contribution</button>
                </form>
            </div>
        </section>
    );
};

export default ContributePage;