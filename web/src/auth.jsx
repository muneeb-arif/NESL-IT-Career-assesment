import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  const login = async (id) => {
    try {
      const res = await axios.post('http://localhost:9000/api/login', { id });
      setToken(res.data.token);
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{ token, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
