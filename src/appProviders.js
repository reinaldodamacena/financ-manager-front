import React from 'react';
import { AuthServiceProvider } from './context/Auth/AuthServiceProvider';
import { UserServiceProvider } from './context/User/userContext'; // ou qualquer outro ServiceContext
// Importar outros providers conforme necessário

const AppProviders = ({ children }) => {
  return (
    <AuthServiceProvider>
      <UserServiceProvider>
        {/* Adicione outros providers conforme necessário */}
        {children}
      </UserServiceProvider>
    </AuthServiceProvider>
  );
};

export default AppProviders;
