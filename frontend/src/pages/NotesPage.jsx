import { useState, useEffect } from 'react';
import { getNotes } from '../services/api';
import { FilterBar } from '../components/FilterBar';
import './NotesPage.css';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getNotes()
      .then(response => {
        setNotes(response.data);
        setFilteredNotes(response.data);
      })
      .catch(error => {
        console.error("Failed to fetch notes:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (searchTerm) => {
    const filtered = notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  const groupedNotes = filteredNotes.reduce((acc, note) => {
    (acc[note.category] = acc[note.category] || []).push(note);
    return acc;
  }, {});

  // First, check if the page is loading. If so, return a loading message.
  if (loading) {
    return (
      <div>
        <div className="page-header">
          <h1>Subject Notes</h1>
          <FilterBar onFilterChange={handleFilterChange} placeholder="Filter by subject or title..." />
        </div>
        <p style={{ textAlign: 'center', padding: '2rem' }}>Loading notes...</p>
      </div>
    );
  }

  // If not loading, return the main content.
  return (
    <div>
      <div className="page-header">
        <h1>Subject Notes</h1>
        <FilterBar onFilterChange={handleFilterChange} placeholder="Filter by subject or title..." />
      </div>
      <div className="container">
        {Object.keys(groupedNotes).length > 0 ? (
          Object.entries(groupedNotes).map(([category, notesInCategory]) => (
            <div key={category} className="resource-category">
              <h2>{category}</h2>
              <div className="resource-tags">
                {notesInCategory.map(note => (
                  <a key={note.id} href={note.gdrive_link} className="resource-tag" target="_blank" rel="noopener noreferrer">
                    <img src={"https://api.iconify.design/solar/calendar-minimalistic-linear.svg"} alt="icon"/>
                    {note.title}
                  </a>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>No notes have been added yet, or none match your search.</p>
        )}
      </div>
    </div>
  );
};

export default NotesPage;