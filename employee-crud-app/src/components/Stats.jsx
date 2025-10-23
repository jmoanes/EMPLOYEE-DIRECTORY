import React from 'react';

const Stats = ({ employees }) => {
  const totalEmployees = employees.length;
  
  const roleCount = employees.reduce((acc, emp) => {
    acc[emp.role] = (acc[emp.role] || 0) + 1;
    return acc;
  }, {});

  const departmentCount = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

  const mostCommonRole = Object.keys(roleCount).reduce((a, b) => 
    roleCount[a] > roleCount[b] ? a : b, 'N/A'
  );

  const mostCommonDepartment = Object.keys(departmentCount).reduce((a, b) => 
    departmentCount[a] > departmentCount[b] ? a : b, 'N/A'
  );

  return (
    <div className="stats-container">
      <div className="stat-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <h3>{totalEmployees}</h3>
        <p>Total Employees</p>
      </div>
      <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
        <h3>{Object.keys(roleCount).length}</h3>
        <p>Different Roles</p>
      </div>
      <div className="stat-card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
        <h3>{Object.keys(departmentCount).length}</h3>
        <p>Departments</p>
      </div>
      <div className="stat-card" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
        <h3>{totalEmployees > 0 ? mostCommonRole : 'N/A'}</h3>
        <p>Most Common Role</p>
      </div>
    </div>
  );
};

export default Stats;
