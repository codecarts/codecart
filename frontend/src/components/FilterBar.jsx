import React from 'react';
import './FilterBar.css'; // We'll create this file next

export const FilterBar = ({ onFilterChange, placeholder }) => {
  return (
    <div className="filter-container">
      <input
        type="text"
        className="filter-input"
        placeholder={placeholder || "Search..."}
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
};