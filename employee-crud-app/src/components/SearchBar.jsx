import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, onExportCSV }) => {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search by name, email, role, or department..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button 
            onClick={() => onSearchChange('')}
            className="clear-search"
            title="Clear search"
          >
            ×
          </button>
        )}
      </div>
      <button 
        onClick={onExportCSV}
        className="btn btn-export"
        title="Export to CSV"
      >
        📥 Export CSV
      </button>
    </div>
  );
};

export default SearchBar;
