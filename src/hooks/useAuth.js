import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/authService';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Verifica se o usuário está autenticado ao carregar o aplicativo
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Aqui você pode adicionar lógica para validar o token e carregar os dados do usuário, se necessário
      setUser({ token }); // Simplesmente definindo o token como o usuário
    }
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      localStorage.setItem('authToken', response.token); // Salva o token no localStorage
      setUser({ username: credentials.username, token: response.token });
      navigate('/home'); // Navega para a página inicial após o login
      return response;
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Login falhou. Por favor, tente novamente.'); // Exibe a mensagem de erro retornada pelo servidor
      } else {
        setError('Login falhou. Por favor, tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken'); // Remove o token do localStorage
    setUser(null);
    navigate('/login'); // Redireciona para a página de login
  };

  return {
    user,
    login,
    logout,
    loading,
    error,
  };
};

export default useAuth;
