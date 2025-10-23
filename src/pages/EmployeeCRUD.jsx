import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';
import Alert from '../components/Alert';
import Stats from '../components/Stats';
import SearchBar from '../components/SearchBar';
import DarkModeToggle from '../components/DarkModeToggle';
import Pagination from '../components/Pagination';
import BulkActions from '../components/BulkActions';
import ImportCSV from '../components/ImportCSV';

const EmployeeCRUD = () => {
  const { currentUser, signout } = useAuth();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showBulkMode, setShowBulkMode] = useState(false);

  // Load employees from localStorage on component mount
  useEffect(() => {
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
      try {
        const parsedEmployees = JSON.parse(storedEmployees);
        setEmployees(parsedEmployees);
      } catch (error) {
        console.error('Error parsing employees from localStorage:', error);
        showAlert('Error loading employees', 'error');
      }
    }

    // Load dark mode preference
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode === 'true') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  // Save employees to localStorage whenever the list changes
  useEffect(() => {
    if (employees.length > 0) {
      localStorage.setItem('employees', JSON.stringify(employees));
    } else {
      localStorage.removeItem('employees');
    }
  }, [employees]);

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
  };

  const hideAlert = () => {
    setAlert({ show: false, message: '', type: '' });
  };

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const handleAddEmployee = (employeeData) => {
    if (editingEmployee) {
      // Update existing employee
      const updatedEmployees = employees.map(emp =>
        emp.id === editingEmployee.id ? { ...employeeData, id: editingEmployee.id } : emp
      );
      setEmployees(updatedEmployees);
      setEditingEmployee(null);
      showAlert(`Employee "${employeeData.name}" updated successfully! 🎉`, 'success');
    } else {
      // Add new employee
      const newEmployee = {
        id: generateId(),
        ...employeeData
      };
      setEmployees([...employees, newEmployee]);
      showAlert(`Employee "${employeeData.name}" added successfully! 🎉`, 'success');
    }
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showAlert(`Editing employee: ${employee.name}`, 'info');
  };

  const handleDeleteEmployee = (id, name) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${name}?`);
    if (confirmed) {
      const updatedEmployees = employees.filter(emp => emp.id !== id);
      setEmployees(updatedEmployees);
      showAlert(`Employee "${name}" deleted successfully! 🗑️`, 'success');
      
      // If we're editing the employee being deleted, cancel the edit
      if (editingEmployee && editingEmployee.id === id) {
        setEditingEmployee(null);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingEmployee(null);
    showAlert('Edit cancelled', 'info');
  };

  const handleExportCSV = () => {
    if (filteredEmployees.length === 0) {
      showAlert('No employees to export', 'error');
      return;
    }

    const headers = ['Name', 'Email', 'Role', 'Department'];
    const csvData = filteredEmployees.map(emp => [
      emp.name,
      emp.email,
      emp.role,
      emp.department
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `employees_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showAlert(`Exported ${filteredEmployees.length} employees to CSV! 📥`, 'success');
  };

  const handleImportCSV = (importedEmployees) => {
    const newEmployees = importedEmployees.map(emp => ({
      id: generateId(),
      ...emp
    }));
    
    setEmployees([...employees, ...newEmployees]);
    showAlert(`Successfully imported ${newEmployees.length} employees! 📤`, 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    
    if (newDarkMode) {
      document.body.classList.add('dark-mode');
      showAlert('Dark mode enabled 🌙', 'info');
    } else {
      document.body.classList.remove('dark-mode');
      showAlert('Light mode enabled ☀️', 'info');
    }
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter(emp => {
    const searchLower = searchTerm.toLowerCase();
    return (
      emp.name.toLowerCase().includes(searchLower) ||
      emp.email.toLowerCase().includes(searchLower) ||
      emp.role.toLowerCase().includes(searchLower) ||
      emp.department.toLowerCase().includes(searchLower)
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);

  // Reset to page 1 when search term or items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
  };

  // Bulk selection
  const handleToggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(selectedId => selectedId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds(paginatedEmployees.map(emp => emp.id));
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    const confirmed = window.confirm(`Are you sure you want to delete ${selectedIds.length} employee(s)?`);
    if (confirmed) {
      const updatedEmployees = employees.filter(emp => !selectedIds.includes(emp.id));
      setEmployees(updatedEmployees);
      setSelectedIds([]);
      showAlert(`Successfully deleted ${selectedIds.length} employee(s)! 🗑️`, 'success');
    }
  };

  const toggleBulkMode = () => {
    setShowBulkMode(!showBulkMode);
    setSelectedIds([]);
    showAlert(showBulkMode ? 'Bulk mode disabled' : 'Bulk mode enabled - Select employees to delete', 'info');
  };

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to sign out?');
    if (confirmed) {
      signout();
      navigate('/auth');
    }
  };

  return (
    <div>
      <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
      
      <div className="app-header">
        <div className="header-content">
          <div>
            <h1>👨‍💼 Employee Management System</h1>
            <p>Complete CRUD Application with React & LocalStorage</p>
          </div>
          <div className="user-info-header">
            <div className="user-badge">
              <span className="user-icon">{currentUser?.role === 'admin' ? '👑' : '👤'}</span>
              <div className="user-details">
                <span className="user-email">{currentUser?.email}</span>
                <span className="user-role">{currentUser?.role}</span>
              </div>
            </div>
            <button onClick={handleLogout} className="btn btn-logout">
              🚪 Sign Out
            </button>
          </div>
        </div>
      </div>

      {alert.show && (
        <div className="container">
          <Alert 
            message={alert.message} 
            type={alert.type} 
            onClose={hideAlert} 
          />
        </div>
      )}

      <div className="container">
        <Stats employees={filteredEmployees} />
      </div>

      <div className="container">
        <div className="action-bar">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onExportCSV={handleExportCSV}
          />
          <div className="action-buttons">
            <ImportCSV onImport={handleImportCSV} />
            <button onClick={toggleBulkMode} className={`btn ${showBulkMode ? 'btn-bulk-active' : 'btn-bulk'}`}>
              {showBulkMode ? '✅ Bulk Mode ON' : '☑️ Bulk Select'}
            </button>
            <button onClick={handlePrint} className="btn btn-print">
              🖨️ Print
            </button>
          </div>
        </div>
      </div>

      {showBulkMode && (
        <div className="container">
          <BulkActions
            selectedCount={selectedIds.length}
            totalCount={paginatedEmployees.length}
            onBulkDelete={handleBulkDelete}
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
          />
        </div>
      )}

      <div className="container">
        <EmployeeForm 
          onSubmit={handleAddEmployee}
          editingEmployee={editingEmployee}
          onCancelEdit={handleCancelEdit}
        />
      </div>

      <div className="container">
        <EmployeeList 
          employees={paginatedEmployees}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          showCheckboxes={showBulkMode}
        />
        
        {filteredEmployees.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredEmployees.length}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        )}
      </div>

      {searchTerm && filteredEmployees.length === 0 && (
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No Results Found</h3>
            <p>No employees match your search: "{searchTerm}"</p>
            <button onClick={() => setSearchTerm('')} className="btn btn-primary" style={{ marginTop: '20px' }}>
              Clear Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeCRUD;
