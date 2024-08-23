import React, { createContext, useContext, useState, useEffect } from 'react';
import useService from '../hooks/useService';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

export const createServiceContext = (service) => {
  const ServiceContext = createContext();

  const ServiceProvider = ({ children }) => {
    const serviceData = useService(service); // Operações CRUD
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook de navegação

    useEffect(() => {
      const token = localStorage.getItem('authToken');
      if (token) {
        setUser({ token }); // Simplificação do estado do usuário
      }
      setLoading(false);
    }, []);

    const login = async (credentials) => {
      setLoading(true);
      setError(null);
      try {
        const response = await service.login(credentials);
        localStorage.setItem('authToken', response.token);
        console.log(response);
        setUser({ username: credentials.username, token: response.token });
        navigate('/home'); // Navega para a página Home após o login bem-sucedido
      } catch (err) {
        setError('Login failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    const logout = () => {
      service.logout?.(); // Certifique-se de que o serviço tem um método logout
      setUser(null);
      localStorage.removeItem('authToken');
      navigate('/login'); // Redireciona para a página de login após o logout
    };

    return (
      <ServiceContext.Provider
        value={{
          ...serviceData,
          user,
          loading,
          error,
          login,
          logout,
        }}
      >
        {children}
      </ServiceContext.Provider>
    );
  };

  const useServiceContext = () => {
    const context = useContext(ServiceContext);
    if (!context) {
      throw new Error('useServiceContext must be used within a ServiceProvider');
    }
    return context;
  };

  return { ServiceProvider, useServiceContext };
};
