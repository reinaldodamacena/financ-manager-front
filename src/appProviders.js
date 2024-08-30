import React from 'react';
import { AuthServiceProvider } from './context/Auth/AuthServiceProvider';
import { UserServiceProvider } from './context/User/UserServiceProvider';
import { ProductServiceProvider } from './context/Product/ProductServiceProvider';
import { CashRegisterProvider } from './context/CashRegister/CashRegisterServiceProvider'; 

const AppProviders = ({ children }) => {
  return (
    <AuthServiceProvider>
      <UserServiceProvider>
        <ProductServiceProvider>
          <CashRegisterProvider>
          {children}
          </CashRegisterProvider>
        </ProductServiceProvider>
      </UserServiceProvider>
    </AuthServiceProvider>
  );
};

export default AppProviders;
