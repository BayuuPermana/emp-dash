import React, { useState, useEffect } from 'react';
import './Stats.css';

interface StatsData {
  totalEmployees: number;
  presentToday: number;
  late: number;
  onLeave: number;
}

const Stats: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/stats')
      .then(response => response.json())
      .then(data => setStats(data));
  }, []);

  return (
    <div className="stats">
      <div className="stat-card">
        <h3>Total Employees</h3>
        <p>{stats?.totalEmployees}</p>
      </div>
      <div className="stat-card">
        <h3>Present Today</h3>
        <p>{stats?.presentToday}</p>
      </div>
      <div className="stat-card">
        <h3>Late</h3>
        <p>{stats?.late}</p>
      </div>
      <div className="stat-card">
        <h3>On Leave</h3>
        <p>{stats?.onLeave}</p>
      </div>
    </div>
  );
};

export default Stats;
