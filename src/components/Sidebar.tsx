import React from 'react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="https://via.placeholder.com/40" alt="AttendTrack Logo" />
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
