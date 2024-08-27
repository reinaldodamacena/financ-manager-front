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

    // Recupera o estado do usuário ao carregar o componente
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Restaura o estado do usuário
        console.log("Usuário recuperado do localStorage:", JSON.parse(storedUser));
      }
      setLoading(false);
    }, []);

    const login = async (credentials) => {
      setLoading(true);
      setError(null);
      try {
        const response = await service.login(credentials);
        
        // Supondo que o response já contenha o userId do Keycloak
        const userData = {
          username: credentials.username,
          token: response.token,
          userId: response.userId // Aqui você captura o userId do Keycloak
        };
    
        localStorage.setItem('user', JSON.stringify(userData)); // Armazena o usuário no localStorage
        setUser(userData);
        console.log("Usuário logado:", userData);
        navigate('/home'); // Navega para a página Home após o login bem-sucedido
      } catch (err) {
        setError('Falha no login. Por favor, tente novamente.');
        console.error("Erro ao fazer login:", err);
      } finally {
        setLoading(false);
      }
    };

    const logout = () => {
      service.logout?.(); // Certifique-se de que o serviço tem um método logout
      setUser(null);
      localStorage.removeItem('user'); // Remove os dados do usuário do localStorage
      console.log("Usuário deslogado e redirecionado para login");
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
      throw new Error('useServiceContext deve ser usado dentro de um ServiceProvider');
    }
    return context;
  };

  return { ServiceProvider, useServiceContext };
};
