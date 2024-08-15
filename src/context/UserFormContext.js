import React, { createContext, useState } from 'react';

// Criando o Contexto
export const UserFormContext = createContext();

export const UserFormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    type: '',
    nameOrCompanyName: '',
    nicknameOrTradeName: '',
    cpfOrCnpj: '',
    addressId: '',
    phone: '',
    isCompany: false,
    username: '',
    password: '',
    email: '',
    roleId: '',
    isActive: true,
    securityQuestion: '',
    securityAnswerHash: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode implementar a lógica para enviar o formulário
    console.log('Dados do formulário enviados:', formData);
  };

  return (
    <UserFormContext.Provider value={{ formData, handleChange, handleSubmit }}>
      {children}
    </UserFormContext.Provider>
  );
};
