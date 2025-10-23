import React, { useState } from 'react';

const EmployeeList = ({ employees, onEdit, onDelete, selectedIds = [], onToggleSelect, showCheckboxes = false }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const isSelected = (id) => selectedIds.includes(id);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedEmployees = () => {
    if (!sortConfig.key) return employees;

    return [...employees].sort((a, b) => {
      const aValue = a[sortConfig.key].toString().toLowerCase();
      const bValue = b[sortConfig.key].toString().toLowerCase();

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return ' ⇅';
    return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
  };

  const sortedEmployees = getSortedEmployees();
  if (sortedEmployees.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📋</div>
        <h3>No Employees Found</h3>
        <p>Start by adding your first employee using the form above.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <h2>👥 Employee List ({sortedEmployees.length})</h2>
      <table className="employee-table">
        <thead>
          <tr>
            {showCheckboxes && <th style={{ width: '50px' }}>☑️</th>}
            <th>#</th>
            <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
              Name{getSortIcon('name')}
            </th>
            <th onClick={() => handleSort('email')} style={{ cursor: 'pointer' }}>
              Email{getSortIcon('email')}
            </th>
            <th onClick={() => handleSort('role')} style={{ cursor: 'pointer' }}>
              Role{getSortIcon('role')}
            </th>
            <th onClick={() => handleSort('department')} style={{ cursor: 'pointer' }}>
              Department{getSortIcon('department')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map((employee, index) => (
            <tr key={employee.id} className={isSelected(employee.id) ? 'selected-row' : ''}>
              {showCheckboxes && (
                <td>
                  <input
                    type="checkbox"
                    checked={isSelected(employee.id)}
                    onChange={() => onToggleSelect(employee.id)}
                    className="employee-checkbox"
                  />
                </td>
              )}
              <td>{index + 1}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>
                <span style={{
                  padding: '5px 10px',
                  borderRadius: '5px',
                  background: '#e3f2fd',
                  color: '#1976d2',
                  fontSize: '0.85rem',
                  fontWeight: '600'
                }}>
                  {employee.role}
                </span>
              </td>
              <td>{employee.department}</td>
              <td>
                <div className="actions">
                  <button 
                    onClick={() => onEdit(employee)} 
                    className="btn btn-edit"
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    onClick={() => onDelete(employee.id, employee.name)} 
                    className="btn btn-delete"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
