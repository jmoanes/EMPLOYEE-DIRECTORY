import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { currentUser, isAdmin } = useAuth();

  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  if (requireAdmin && !isAdmin()) {
    return (
      <div className="access-denied-container">
        <div className="access-denied-card">
          <div className="access-denied-icon">🚫</div>
          <h1>Access Denied</h1>
          <p>You need admin privileges to access this page.</p>
          <p className="user-info">Logged in as: <strong>{currentUser.email}</strong> (Role: {currentUser.role})</p>
          <div className="access-denied-actions">
            <button onClick={() => window.location.href = '/auth'} className="btn btn-primary">
              Sign In as Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
