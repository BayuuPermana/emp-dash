import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  FileText,
  Settings,
  LifeBuoy,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Users
} from 'lucide-react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  console.log("Rendering Sidebar");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path ? 'active' : '';

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
          <li className={isActive('/admin')}>
            <Link to="/admin">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className={isActive('/admin/employees')}>
            <Link to="/admin/employees">
              <Users size={20} />
              <span>Employees</span>
            </Link>
          </li>
          <li className={isActive('/admin/reports')}>
            <Link to="/admin/reports">
              <FileText size={20} />
              <span>Reports</span>
            </Link>
          </li>
          <li className={isActive('/admin/settings')}>
            <Link to="/admin/settings">
              <Settings size={20} />
              <span>Settings</span>
            </Link>
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
            <a href="#" onClick={handleLogout}>
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
