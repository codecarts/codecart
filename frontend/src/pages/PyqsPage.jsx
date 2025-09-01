import React, { useState, useEffect, useMemo } from 'react';
import { getPyqs } from '../services/api'; // Changed to getPyqs
import './HierarchicalView.css'; // Reuses the same CSS as the Notes page

const PyqsPage = () => {
    const [pyqs, setPyqs] = useState([]); // Renamed state
    const [loading, setLoading] = useState(true);
    const [openDepartment, setOpenDepartment] = useState(null);

    useEffect(() => {
        getPyqs() // Changed function call
            .then(response => {
                setPyqs(response.data);
                // Automatically open the first department by default
                if (response.data.length > 0) {
                    const firstDept = response.data[0].department;
                    setOpenDepartment(firstDept);
                }
            })
            .catch(error => console.error("Failed to fetch PYQs:", error)) // Changed error message
            .finally(() => setLoading(false));
    }, []);

    const toggleDepartment = (department) => {
        setOpenDepartment(openDepartment === department ? null : department);
    };

    // Group data into a nested structure: Department > Course > Semester > Subjects
    const groupedData = useMemo(() => {
        const hierarchy = {};
        pyqs.forEach(pyq => { // Renamed variable
            const { department, course, semester, subject, gdrive_link, id } = pyq;
            if (!hierarchy[department]) hierarchy[department] = {};
            if (!hierarchy[department][course]) hierarchy[department][course] = {};
            if (!hierarchy[department][course][semester]) hierarchy[department][course][semester] = [];
            hierarchy[department][course][semester].push({ id, subject, gdrive_link });
        });
        return hierarchy;
    }, [pyqs]);

    if (loading) return <p className="page-header">Loading PYQs...</p>; // Changed text

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <div className="page-header">
                <h1>Previous Year Questions</h1> {/* Changed title */}
                <p style={{color: 'var(--secondary-text)'}}>Select a department to view available resources.</p>
            </div>

            {Object.keys(groupedData).length > 0 ? (
                Object.entries(groupedData).map(([department, courses]) => (
                    <div key={department} className="department-group">
                        <div 
                            className={`department-header ${openDepartment === department ? 'open' : ''}`} 
                            onClick={() => toggleDepartment(department)}
                        >
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
                                                    {subjects.map(pyq => ( // Renamed variable
                                                        <li key={pyq.id} className="subject-item">
                                                            <a href={pyq.gdrive_link} target="_blank" rel="noopener noreferrer">
                                                                {pyq.subject}
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
                <p style={{ textAlign: 'center' }}>No PYQs have been added yet.</p> // Changed text
            )}
        </div>
    );
};

export default PyqsPage;