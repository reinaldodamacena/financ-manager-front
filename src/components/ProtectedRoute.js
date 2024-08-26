import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/Auth/AuthServiceProvider';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuthContext();

    if (loading) {
      return <div>Carregando...</div>; // Exibe um loading enquanto o estado user está sendo carregado
    }
  
    if (!user) {
      console.log("Usuário não autenticado, redirecionando para login");
      return <Navigate to="/login" replace />;
    }
  
    return children;
};

export default ProtectedRoute;