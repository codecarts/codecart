import React, { useState } from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import { submitContactForm } from '../services/api';
import './ContactPage.css';

const ContactPage = () => {
    const { user } = useUserAuth();
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            await submitContactForm(formData, user.token);
            setMessage("Thank you for your message! It has been received.");
            e.target.reset();
        } catch (error) {
            setMessage("Failed to send message. Please try again later.");
            console.error("Contact form submission error:", error);
        }
    };

    return (
        <section className="contact-section">
            <div className="contact-container">
                <h1>Contact Us</h1>
                <p>Have a question or want to collaborate? Send us a message!</p>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required />
                    <textarea name="message" placeholder="Your Message" onChange={handleChange} required></textarea>
                    <button type="submit">Send Message</button>
                    {message && <p style={{textAlign: 'center', marginTop: '1rem'}}>{message}</p>}
                </form>
            </div>
        </section>
    );
};

export default ContactPage;