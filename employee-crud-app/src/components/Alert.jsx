import React, { useEffect } from 'react';

const Alert = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'info':
        return 'ℹ️';
      default:
        return '📢';
    }
  };

  return (
    <div className={`alert alert-${type}`}>
      <span>{getIcon()}</span>
      <span>{message}</span>
      <button 
        onClick={onClose}
        style={{
          marginLeft: 'auto',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.2rem',
          padding: '0 5px'
        }}
      >
        ×
      </button>
    </div>
  );
};

export default Alert;
