import React, { createContext, useContext } from 'react';
import useService from '../hooks/useService';

export const createServiceContext = (service) => {
  const ServiceContext = createContext();

  const ServiceProvider = ({ children }) => {
    const serviceData = useService(service);

    return (
      <ServiceContext.Provider value={serviceData}>
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
