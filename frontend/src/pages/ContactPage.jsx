import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle form submission, e.g., send to an API
        alert("Thank you for your message!");
        e.target.reset();
    };

    return (
        <section className="contact-section">
            <div className="contact-container">
                <h1>Contact Us</h1>
                <p>Have a question or want to collaborate? Send us a message!</p>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Your Name" required />
                    <input type="email" name="email" placeholder="Your Email" required />
                    <textarea name="message" placeholder="Your Message" required></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </div>
        </section>
    );
};

export default ContactPage;