import React, { createContext, useContext, useState } from 'react';

// Adicionando um valor padrão ao contexto para evitar quebras
const UserContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  
  if (!context) {
    console.error("basename is null or undefined");
    return {
      user: null,
      login: () => {},
      logout: () => {},
    };
  }

  return context;
};
