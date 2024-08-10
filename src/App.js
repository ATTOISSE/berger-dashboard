import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'; 
import {AdminDashboard} from './components/admin/index';
import {Client} from './components/client/index';
import Home from './components';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <Router>
      <div className={isDarkMode ? 'dark-mode' : ''}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/*" element={<AdminDashboard toggleTheme={toggleTheme} isDarkMode={isDarkMode} />} />

          <Route path="/client/*" element={<Client />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
