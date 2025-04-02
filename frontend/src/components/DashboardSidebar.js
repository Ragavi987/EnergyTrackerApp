// frontend/src/components/DashboardSidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DashboardSidebar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <div className="bg-blue-800 text-white w-64 p-4 hidden md:block h-screen">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <ul className="space-y-2">
        <li>
          <Link 
            to="/dashboard" 
            className={`block p-2 rounded hover:bg-blue-700 ${isActive('/dashboard')}`}
          >
            Overview
          </Link>
        </li>
        <li>
          <Link 
            to="/dashboard/upload" 
            className={`block p-2 rounded hover:bg-blue-700 ${isActive('/dashboard/upload')}`}
          >
            Upload Data
          </Link>
        </li>
        <li>
          <Link 
            to="/dashboard/reports" 
            className={`block p-2 rounded hover:bg-blue-700 ${isActive('/dashboard/reports')}`}
          >
            Reports
          </Link>
        </li>
        <li>
          <Link 
            to="/dashboard/settings" 
            className={`block p-2 rounded hover:bg-blue-700 ${isActive('/dashboard/settings')}`}
          >
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardSidebar;