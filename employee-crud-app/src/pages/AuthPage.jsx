import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthForm from '../components/AuthForm';
import Alert from '../components/Alert';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const { signup, signin } = useAuth();
  const navigate = useNavigate();

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
  };

  const hideAlert = () => {
    setAlert({ show: false, message: '', type: '' });
  };

  const handleAuth = async (formData) => {
    try {
      if (isLogin) {
        // Sign in
        const user = signin(formData.email, formData.password);
        showAlert(`Welcome back, ${user.email}! 🎉`, 'success');
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          if (user.role === 'admin') {
            navigate('/dashboard');
          } else {
            navigate('/dashboard'); // Will show access denied
          }
        }, 1000);
      } else {
        // Sign up
        signup(formData);
        showAlert(`Account created successfully! Please sign in. ✅`, 'success');
        
        // Switch to login mode after successful signup
        setTimeout(() => {
          setIsLogin(true);
        }, 1500);
      }
    } catch (error) {
      showAlert(error.message || 'Authentication failed. Please try again.', 'error');
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    hideAlert();
  };

  // Initialize demo users if not exists
  React.useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
      // Add demo admin user
      const demoUsers = [
        {
          id: 'demo-admin-1',
          email: 'admin@demo.com',
          password: 'admin123',
          role: 'admin',
          createdAt: new Date().toISOString()
        },
        {
          id: 'demo-user-1',
          email: 'user@demo.com',
          password: 'user123',
          role: 'user',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('users', JSON.stringify(demoUsers));
    }
  }, []);

  return (
    <div className="auth-page">
      {alert.show && (
        <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999, minWidth: '300px' }}>
          <Alert 
            message={alert.message} 
            type={alert.type} 
            onClose={hideAlert} 
          />
        </div>
      )}
      <AuthForm 
        onAuth={handleAuth}
        isLogin={isLogin}
        onToggleMode={toggleMode}
      />
    </div>
  );
};

export default AuthPage;
