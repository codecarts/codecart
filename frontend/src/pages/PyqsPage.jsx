import { useState, useEffect } from 'react';
import { getPyqs } from '../services/api';
import { FilterBar } from '../components/FilterBar';
import './NotesPage.css';

const PyqsPage = () => {
  const [pyqs, setPyqs] = useState([]);
  const [filteredPyqs, setFilteredPyqs] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const icon = "https://api.iconify.design/solar/calendar-minimalistic-linear.svg";

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching starts
    getPyqs()
      .then(response => {
        setPyqs(response.data);
        setFilteredPyqs(response.data);
      })
      .catch(error => {
        console.error("Failed to fetch PYQs:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false once fetching is complete
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

  return (
    <div>
      <div className="page-header">
        <h1>Previous Year Questions</h1>
        <FilterBar onFilterChange={handleFilterChange} placeholder="Filter by subject or title..." />
      </div>
      <div className="container">
        {/* Show a loading message while fetching */}
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading PYQs...</p>
        ) : Object.keys(groupedPyqs).length > 0 ? (
          Object.entries(groupedPyqs).map(([category, pyqsInCategory]) => (
            <div key={category} className="resource-category">
              <h2>{category}</h2>
              <div className="resource-tags">
                {pyqsInCategory.map(pyq => (
                  <a key={pyq.id} href={pyq.gdrive_link} className="resource-tag" target="_blank" rel="noopener noreferrer">
                    <img src={icon} alt="icon"/>
                    {pyq.title}
                  </a>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>No PYQs match your search.</p>
        )}
      </div>
    </div>
  );
};

export default PyqsPage;