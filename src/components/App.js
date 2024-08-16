import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginPage,UserRegistrationPage } from './page/Index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/" element={<LoginPage/>} />
        <Route path="/cadastro" element={< UserRegistrationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
