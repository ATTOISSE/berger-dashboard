import React from 'react'; 
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import Content from '../Content';

export function AdminDashboard({ toggleTheme, isDarkMode }) {
  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <Sidebar />
      <div className={`main-content p-0 bg-${isDarkMode ? 'dark' : 'light'}`}>
        <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <Content />
      </div>
    </div>
  );
}

export default AdminDashboard;
