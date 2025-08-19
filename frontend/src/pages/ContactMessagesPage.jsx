import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { getContactMessages } from '../services/api';
import './ContactMessagesPage.css'; // We'll create this next

const ContactMessagesPage = () => {
    const { auth } = useAdminAuth();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (auth?.credentials) {
            getContactMessages(auth.credentials)
                .then(response => {
                    setMessages(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    setError('Failed to load messages.');
                    setLoading(false);
                });
        }
    }, [auth]);

    if (loading) return <p className="page-header">Loading messages...</p>;
    if (error) return <p className="page-header" style={{color: 'red'}}>{error}</p>;

    return (
        <div className="container" style={{paddingTop: '2rem'}}>
            <h1 className="page-header">Contact Form Messages</h1>
            <div className="messages-list">
                {messages.length > 0 ? (
                    messages.map(msg => (
                        <div key={msg.id} className="message-card">
                            <h3>From: {msg.name} <span>({msg.email})</span></h3>
                            <p>{msg.message}</p>
                            <small>{new Date(msg.created_at).toLocaleString()}</small>
                        </div>
                    ))
                ) : (
                    <p>No messages received yet.</p>
                )}
            </div>
        </div>
    );
};

export default ContactMessagesPage;