import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage, UserRegistrationPage, HomePage, SalePage, ProductPage } from './page/Index';
import ProtectedRoute from './ProtectedRoute'; // Importe o componente ProtectedRoute

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<UserRegistrationPage />} />
      <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/vendas" element={<ProtectedRoute><SalePage /></ProtectedRoute>} />
      <Route path="/produtos" element={<ProtectedRoute><ProductPage /></ProtectedRoute>} />
      <Route path="/" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default App;
