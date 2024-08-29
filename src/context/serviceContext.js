import React, { createContext, useContext } from 'react';
import useService from '../hooks/useService'; // Importa o hook useService

export const createServiceContext = (service) => {
  const ServiceContext = createContext();

  const ServiceProvider = ({ children }) => {
    const serviceMethods = useService(service); // Usar o hook useService

    return (
      <ServiceContext.Provider value={serviceMethods}>
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
