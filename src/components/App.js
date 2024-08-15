import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {HomePage} from './pages/Index';
import UserRegistrationForm from './pages/UserRegistrationPage/Index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/cadastro" element={<UserRegistrationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
