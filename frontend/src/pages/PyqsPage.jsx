import { useState, useEffect } from 'react';
import { getPyqs } from '../services/api'; // Changed from getNotes
import { FilterBar } from '../components/FilterBar';
import './NotesPage.css'; // You can reuse the same CSS file

const PyqsPage = () => { // Changed component name
  const [pyqs, setPyqs] = useState([]); // Renamed state
  const [filteredPyqs, setFilteredPyqs] = useState([]); // Renamed state
  const [loading, setLoading] = useState(true);
  const icon = "https://api.iconify.design/solar/calendar-minimalistic-linear.svg";

  useEffect(() => {
    getPyqs() // Changed function call
      .then(response => {
        setPyqs(response.data);
        setFilteredPyqs(response.data);
        setLoading(false);
      })
      .catch(error => { console.error("Failed to fetch PYQs:", error); setLoading(false); }); // Changed error message
  }, []);

  const handleFilterChange = (searchTerm) => {
    const filtered = pyqs.filter(pyq => // Renamed variable
      pyq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pyq.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPyqs(filtered);
  };

  // Group PYQs by category
  const groupedPyqs = filteredPyqs.reduce((acc, pyq) => { // Renamed variable
    (acc[pyq.category] = acc[pyq.category] || []).push(pyq);
    return acc;
  }, {});

  if (loading) return <p className="page-header">Loading PYQs...</p>; // Changed text

  return (
    <div>
      <div className="page-header">
        <h1>Previous Year Questions</h1> {/* Changed title */}
        <FilterBar onFilterChange={handleFilterChange} placeholder="Filter by subject or title..." />
      </div>
      <div className="container">
        {Object.keys(groupedPyqs).length > 0 ? (
          Object.entries(groupedPyqs).map(([category, pyqsInCategory]) => ( // Renamed variable
            <div key={category} className="resource-category">
              <h2>{category}</h2>
              <div className="resource-tags">
                {pyqsInCategory.map(pyq => ( // Renamed variable
                  <a key={pyq.id} href={pyq.gdrive_link} className="resource-tag" target="_blank" rel="noopener noreferrer">
                    <img src={icon} alt="icon"/>
                    {pyq.title}
                  </a>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p style={{textAlign: 'center'}}>No PYQs match your search.</p> // Changed text
        )}
      </div>
    </div>
  );
};

export default PyqsPage; // Changed export