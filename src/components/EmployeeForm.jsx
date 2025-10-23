import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ onSubmit, editingEmployee, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingEmployee) {
      setFormData(editingEmployee);
    } else {
      setFormData({
        name: '',
        email: '',
        role: '',
        department: ''
      });
    }
  }, [editingEmployee]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        name: '',
        email: '',
        role: '',
        department: ''
      });
      setErrors({});
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      email: '',
      role: '',
      department: ''
    });
    setErrors({});
    onCancelEdit();
  };

  return (
    <div className="form-container">
      <h2>{editingEmployee ? '✏️ Edit Employee' : '➕ Add New Employee'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="employee-form">
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
            />
            {errors.name && <span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />
            {errors.email && <span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="role">Role *</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select a role</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Support">Support</option>
            </select>
            {errors.role && <span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.role}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="department">Department *</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">Select a department</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Management">Management</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Customer Support">Customer Support</option>
            </select>
            {errors.department && <span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.department}</span>}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button type="submit" className={editingEmployee ? 'btn btn-success' : 'btn btn-primary'}>
            {editingEmployee ? '💾 Update Employee' : '➕ Add Employee'}
          </button>
          {editingEmployee && (
            <button type="button" onClick={handleCancel} className="btn btn-cancel">
              ❌ Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
