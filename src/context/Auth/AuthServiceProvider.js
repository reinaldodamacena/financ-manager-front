import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/authService';

const AuthContext = createContext();

export const AuthServiceProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      console.log('User loaded from localStorage:', parsedUser);
    } else {
      console.log('No user found in localStorage.');
    }
    setLoading(false); // Finaliza o carregamento
  }, [navigate]);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      const userData = {
        username: response.username,
        token: response.token,
        userId: response.userId,
      };

      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      console.log('User logged in and data saved:', userData);
      navigate('/home');
    } catch (err) {
      setError('Falha no login. Por favor, tente novamente.');
      console.error('Login failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('User logging out:', user);
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
