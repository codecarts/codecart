import { useState, useEffect } from 'react';
import { getResources } from '../services/api';

const ResourceCard = ({ resource }) => (
  <div className="card">
    <span style={{background: '#eee', padding: '3px 8px', borderRadius: '12px', fontSize: '0.8em'}}>
      {resource.resource_type.toUpperCase()}
    </span>
    <h3>{resource.title}</h3>
    <p>{resource.description}</p>
    <a href={resource.gdrive_link} target="_blank" rel="noopener noreferrer">
      Open in Drive
    </a>
  </div>
);

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResources()
      .then(response => {
        setResources(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch resources:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading resources...</p>;

  return (
    <div>
      <h1>Notes & Previous Year Questions</h1>
      <div className="card-grid">
        {resources.length > 0 ? (
          resources.map(res => <ResourceCard key={res.id} resource={res} />)
        ) : (
          <p>No resources have been uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;