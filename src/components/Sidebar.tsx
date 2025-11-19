import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Settings,
  LifeBuoy,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="logo">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-icon">
          <rect width="40" height="40" rx="8" fill="#4F46E5" />
          <path d="M20 10L28 24H12L20 10Z" fill="white" />
        </svg>
        <div className="logo-text">
          <h2>AttendTrack</h2>
          <p>HR Management</p>
        </div>
      </div>

      <nav>
        <ul>
          <li className="active">
            <a href="#">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#">
              <FileText size={20} />
              <span>Reports</span>
            </a>
          </li>
          <li>
            <a href="#">
              <Settings size={20} />
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <ul>
          <li>
            <a href="#">
              <LifeBuoy size={20} />
              <span>Support</span>
            </a>
          </li>
          <li>
            <a href="#">
              <LogOut size={20} />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>

      <button className="toggle-btn" onClick={toggleSidebar}>
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </div>
  );
};

export default Sidebar;
