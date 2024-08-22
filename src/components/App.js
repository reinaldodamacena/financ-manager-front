import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage, UserRegistrationPage, HomePage, SalePage } from './page/Index';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/cadastro" element={<UserRegistrationPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/vendas" element={<SalePage />} />
    </Routes>
  );
}

export default App;
