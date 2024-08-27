import React from 'react';
import { AuthServiceProvider } from './context/Auth/AuthServiceProvider';
import { UserServiceProvider } from './context/User/userContext';
import { ProductServiceProvider } from './context/Product/ProductProvider' // ou qualquer outro ServiceContext
// Importar outros providers conforme necessário

const AppProviders = ({ children }) => {
  return (
    <AuthServiceProvider>
      <UserServiceProvider>
        <ProductServiceProvider>
        {/* Adicione outros providers conforme necessário */}
        {children}
        </ProductServiceProvider>
      </UserServiceProvider>
    </AuthServiceProvider>
  );
};

export default AppProviders;
