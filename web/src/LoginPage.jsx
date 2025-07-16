import { useState } from 'react';
import { useAuth } from './auth.jsx';

function LoginPage() {
  const [userId, setUserId] = useState('u1');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(userId);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="user-select" className="form-label">Select User Role:</label>
            <select 
              id="user-select"
              value={userId} 
              onChange={(e) => setUserId(e.target.value)}
              className="form-select"
            >
              <option value="u1">👤 Regular User</option>
              <option value="u2">👑 Admin User</option>
            </select>
          </div>
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
