import React from 'react';
import { AuthServiceProvider } from './context/Auth/AuthServiceProvider';
import { UserServiceProvider } from './context/User/UserServiceProvider';
import { ProductServiceProvider } from './context/Product/ProductServiceProvider';
import { CashRegisterProvider } from './context/CashRegister/CashRegisterServiceProvider'; 
import { SaleServiceProvider } from 'context/Sale/SaleServiceProvider';
const AppProviders = ({ children }) => {
  return (
    <AuthServiceProvider>
      <UserServiceProvider>
        <ProductServiceProvider>
          <CashRegisterProvider>
            <SaleServiceProvider>
            {children}
            </SaleServiceProvider>
          </CashRegisterProvider>
        </ProductServiceProvider>
      </UserServiceProvider>
    </AuthServiceProvider>
  );
};

export default AppProviders;
