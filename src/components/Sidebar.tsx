import React from 'react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '12px' }}>
          <rect width="40" height="40" rx="8" fill="#4F46E5" />
          <path d="M20 10L28 24H12L20 10Z" fill="white" />
        </svg>
        <div>
          <h2>AttendTrack</h2>
          <p>HR Management</p>
        </div>
      </div>
      <nav>
        <ul>
          <li className="active"><a href="#">Dashboard</a></li>
          <li><a href="#">Reports</a></li>
          <li><a href="#">Settings</a></li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <ul>
          <li><a href="#">Support</a></li>
          <li><a href="#">Logout</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
