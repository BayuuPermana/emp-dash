import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>Attendance Dashboard</h1>
      <div className="user-profile">
        <span className="notifications-icon">🔔</span>
        <img src="https://via.placeholder.com/40" alt="User" />
      </div>
    </header>
  );
};

export default Header;
