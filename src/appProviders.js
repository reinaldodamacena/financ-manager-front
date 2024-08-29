import React from 'react';
import { AuthServiceProvider } from './context/Auth/AuthServiceProvider';
import { UserServiceProvider } from './context/User/UserServiceProvider';
import { ProductServiceProvider } from './context/Product/ProductServiceProvider';

const AppProviders = ({ children }) => {
  return (
    <AuthServiceProvider>
      <UserServiceProvider>
        <ProductServiceProvider>
          {children}
        </ProductServiceProvider>
      </UserServiceProvider>
    </AuthServiceProvider>
  );
};

export default AppProviders;
