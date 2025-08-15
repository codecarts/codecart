import { useState, useEffect } from 'react';
import { getNotes } from '../services/api';
import { FilterBar } from '../components/FilterBar';
import './NotesPage.css';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const icon = "https://api.iconify.design/solar/calendar-minimalistic-linear.svg";

  useEffect(() => {
    getNotes()
      .then(response => {
        setNotes(response.data);
        setFilteredNotes(response.data);
        setLoading(false);
      })
      .catch(error => { console.error("Failed to fetch notes:", error); setLoading(false); });
  }, []);

  const handleFilterChange = (searchTerm) => {
    const filtered = notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  // Group notes by category
  const groupedNotes = filteredNotes.reduce((acc, note) => {
    (acc[note.category] = acc[note.category] || []).push(note);
    return acc;
  }, {});

  if (loading) return <p className="page-header">Loading notes...</p>;

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
                    <img src={icon} alt="icon"/>
                    {note.title}
                  </a>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p style={{textAlign: 'center'}}>No notes match your search.</p>
        )}
      </div>
    </div>
  );
};

export default NotesPage;