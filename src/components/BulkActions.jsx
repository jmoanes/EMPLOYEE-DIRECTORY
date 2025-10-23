import React from 'react';

const BulkActions = ({ selectedCount, onBulkDelete, onSelectAll, onDeselectAll, totalCount }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="bulk-actions">
      <div className="bulk-actions-info">
        <span className="selected-count">{selectedCount} employee{selectedCount > 1 ? 's' : ''} selected</span>
      </div>
      <div className="bulk-actions-buttons">
        {selectedCount < totalCount && (
          <button onClick={onSelectAll} className="btn btn-select-all">
            ✅ Select All ({totalCount})
          </button>
        )}
        <button onClick={onDeselectAll} className="btn btn-deselect">
          ❌ Deselect All
        </button>
        <button onClick={onBulkDelete} className="btn btn-bulk-delete">
          🗑️ Delete Selected ({selectedCount})
        </button>
      </div>
    </div>
  );
};

export default BulkActions;
