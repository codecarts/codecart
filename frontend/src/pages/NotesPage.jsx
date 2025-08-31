import React, { useState, useEffect, useMemo } from 'react';
import { getNotes } from '../services/api';
import './HierarchicalView.css'; // Import the new stylesheet

const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDepartment, setOpenDepartment] = useState(null);

    useEffect(() => {
        getNotes()
            .then(response => setNotes(response.data))
            .catch(error => console.error("Failed to fetch notes:", error))
            .finally(() => setLoading(false));
    }, []);

    const toggleDepartment = (department) => {
        setOpenDepartment(openDepartment === department ? null : department);
    };

    // Group data into a nested structure: Department > Course > Semester > Subjects
    const groupedData = useMemo(() => {
        const hierarchy = {};
        notes.forEach(note => {
            const { department, course, semester, subject, gdrive_link, id } = note;
            if (!hierarchy[department]) hierarchy[department] = {};
            if (!hierarchy[department][course]) hierarchy[department][course] = {};
            if (!hierarchy[department][course][semester]) hierarchy[department][course][semester] = [];
            hierarchy[department][course][semester].push({ id, subject, gdrive_link });
        });
        return hierarchy;
    }, [notes]);

    if (loading) return <p className="page-header">Loading notes...</p>;

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <div className="page-header">
                <h1>Subject Notes</h1>
                <p style={{color: 'var(--secondary-text)'}}>Select a department to view available resources.</p>
            </div>

            {Object.keys(groupedData).length > 0 ? (
                Object.entries(groupedData).map(([department, courses]) => (
                    <div key={department} className="department-group">
                        <div className="department-header" onClick={() => toggleDepartment(department)}>
                            {department}
                        </div>
                        {openDepartment === department && (
                            <div className="department-content">
                                {Object.entries(courses).map(([course, semesters]) => (
                                    <div key={course} className="course-group">
                                        <h2 className="course-header">{course}</h2>
                                        {Object.entries(semesters).map(([semester, subjects]) => (
                                            <div key={semester} className="semester-group">
                                                <h3 className="semester-header">Semester {semester}</h3>
                                                <ul className="subject-list">
                                                    {subjects.map(note => (
                                                        <li key={note.id} className="subject-item">
                                                            <a href={note.gdrive_link} target="_blank" rel="noopener noreferrer">
                                                                {note.subject}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p style={{ textAlign: 'center' }}>No notes have been added yet.</p>
            )}
        </div>
    );
};

export default NotesPage;