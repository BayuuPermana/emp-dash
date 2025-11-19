import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Stats from './components/Stats';
import EmployeeList from './components/EmployeeList';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  console.log("Rendering Dashboard");
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
        <Stats />
        <EmployeeList />
      </div>
    </div>
  );
};

export default Dashboard;
