import React, { useState, useEffect } from 'react';
import { getHackathons } from '../services/api';
import './HackathonsPage.css';

const HackathonsPage = () => {
    const [hackathons, setHackathons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getHackathons()
            .then(response => {
                setHackathons(response.data);
            })
            .catch(error => {
                console.error("Failed to fetch hackathons:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
            <div className="page-header">
                <h1>Hackathons & Competitions</h1>
            </div>

            {/* Add this new Featured Hackathon section */}
            <div className="featured-hackathon-card">
                <h2>Featured: Hackathons in India</h2>
                <p>Explore a comprehensive list of the latest and most exciting hackathons and coding competitions happening across India.</p>
                <a 
                    href="https://your-hackathon-india-link.com" // <-- PASTE YOUR LINK HERE
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    Visit Site
                </a>
            </div>

            {loading ? (
                <p style={{ textAlign: 'center' }}>Loading events...</p>
            ) : (
                <div className="hackathon-list">
                    {hackathons.length > 0 ? (
                        hackathons.map(event => (
                            <div key={event.id} className="hackathon-card">
                                <h2>{event.title}</h2>
                                <p>{event.description}</p>
                                {event.deadline && (
                                    <p className="deadline">
                                        <strong>Deadline:</strong> {new Date(event.deadline).toLocaleDateString()}
                                    </p>
                                )}
                                <a href={event.link} target="_blank" rel="noopener noreferrer" className="hackathon-link">
                                    Apply Now →
                                </a>
                            </div>
                        ))
                    ) : (
                        <p style={{ textAlign: 'center' }}>No other upcoming events listed at the moment.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default HackathonsPage;