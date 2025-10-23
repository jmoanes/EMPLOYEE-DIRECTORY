import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

  const signup = (userData) => {
    // Get existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      email: userData.email,
      password: userData.password, // In production, hash this!
      role: userData.role || 'user',
      createdAt: new Date().toISOString()
    };

    // Save to users list
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Don't auto-login after signup, require signin
    return newUser;
  };

  const signin = (email, password) => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Set current user
    const userSession = {
      id: user.id,
      email: user.email,
      role: user.role
    };
    
    setCurrentUser(userSession);
    localStorage.setItem('currentUser', JSON.stringify(userSession));
    
    return userSession;
  };

  const signout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const isAdmin = () => {
    return currentUser?.role === 'admin';
  };

  const value = {
    currentUser,
    signup,
    signin,
    signout,
    isAdmin,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
