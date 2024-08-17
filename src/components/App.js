import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { 
  LoginPage,
  UserRegistrationPage,
  HomePage } from './page/Index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/cadastro" element={< UserRegistrationPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
