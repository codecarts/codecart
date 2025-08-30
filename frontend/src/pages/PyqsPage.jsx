import { useState, useEffect } from 'react';
import { getPyqs } from '../services/api';
import { FilterBar } from '../components/FilterBar';
import './NotesPage.css'; // You can reuse the same CSS as the Notes page

const PyqsPage = () => {
  const [pyqs, setPyqs] = useState([]);
  const [filteredPyqs, setFilteredPyqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPyqs()
      .then(response => {
        setPyqs(response.data);
        setFilteredPyqs(response.data);
      })
      .catch(error => {
        console.error("Failed to fetch PYQs:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (searchTerm) => {
    const filtered = pyqs.filter(pyq =>
      pyq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pyq.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPyqs(filtered);
  };

  const groupedPyqs = filteredPyqs.reduce((acc, pyq) => {
    (acc[pyq.category] = acc[pyq.category] || []).push(pyq);
    return acc;
  }, {});

  // First, check if the page is loading.
  if (loading) {
    return (
      <div>
        <div className="page-header">
          <h1>Previous Year Questions</h1>
          <FilterBar onFilterChange={handleFilterChange} placeholder="Filter by subject or title..." />
        </div>
        <p style={{ textAlign: 'center', padding: '2rem' }}>Loading PYQs...</p>
      </div>
    );
  }

  // If not loading, return the main content.
  return (
    <div>
      <div className="page-header">
        <h1>Previous Year Questions</h1>
        <FilterBar onFilterChange={handleFilterChange} placeholder="Filter by subject or title..." />
      </div>
      <div className="container">
        {Object.keys(groupedPyqs).length > 0 ? (
          Object.entries(groupedPyqs).map(([category, pyqsInCategory]) => (
            <div key={category} className="resource-category">
              <h2>{category}</h2>
              <div className="resource-tags">
                {pyqsInCategory.map(pyq => (
                  <a key={pyq.id} href={pyq.gdrive_link} className="resource-tag" target="_blank" rel="noopener noreferrer">
                    <img src={"https://api.iconify.design/solar/calendar-minimalistic-linear.svg"} alt="icon"/>
                    {pyq.title}
                  </a>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>No PYQs have been added yet, or none match your search.</p>
        )}
      </div>
    </div>
  );
};

export default PyqsPage;