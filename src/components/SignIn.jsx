import React, { useState } from 'react';
import './SignIn.css';

const SignIn = ({ isOpen, onClose, onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate inputs
    if (!email.trim()) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setError('Password is required');
      setLoading(false);
      return;
    }

    if (isSignUp && !name.trim()) {
      setError('Name is required');
      setLoading(false);
      return;
    }

    // For demo purposes - simulate authentication
    setTimeout(() => {
      setLoading(false);
      
      // Simple validation - in a real app, this would be a server call
      if (email.includes('@') && password.length >= 6) {
        // Mock successful authentication
        const userData = {
          email,
          name: isSignUp ? name : email.split('@')[0],
          userId: 'user_' + Math.random().toString(36).substr(2, 9)
        };
        
        onSignIn(userData);
        onClose();
      } else {
        setError(isSignUp 
          ? 'Failed to create account. Please check your information.' 
          : 'Invalid email or password.'
        );
      }
    }, 1500);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isSignUp ? 'Create an account' : 'Sign in'}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {!isSignUp && (
              <div className="forgot-password">
                <a href="#">Forgot password?</a>
              </div>
            )}
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit" 
            className="sign-in-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-small"></span>
            ) : (
              isSignUp ? 'Create account' : 'Sign in'
            )}
          </button>
        </form>
        
        <div className="toggle-form">
          {isSignUp ? (
            <p>Already have an account? <button onClick={toggleMode}>Sign in</button></p>
          ) : (
            <p>Don't have an account? <button onClick={toggleMode}>Create account</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;