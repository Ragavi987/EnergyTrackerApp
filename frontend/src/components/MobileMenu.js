// frontend/src/components/MobileMenu.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 bg-blue-600 text-white p-2 rounded"
      >
        {isOpen ? 'Close' : 'Menu'}
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-blue-800 text-white z-40 p-4">
          <h2 className="text-xl font-bold mb-6 mt-12">Dashboard</h2>
          <ul className="space-y-4">
            <li>
              <Link 
                to="/dashboard" 
                className={`block p-2 rounded hover:bg-blue-700 ${isActive('/dashboard')}`}
                onClick={() => setIsOpen(false)}
              >
                Overview
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/upload" 
                className={`block p-2 rounded hover:bg-blue-700 ${isActive('/dashboard/upload')}`}
                onClick={() => setIsOpen(false)}
              >
                Upload Data
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/reports" 
                className={`block p-2 rounded hover:bg-blue-700 ${isActive('/dashboard/reports')}`}
                onClick={() => setIsOpen(false)}
              >
                Reports
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/settings" 
                className={`block p-2 rounded hover:bg-blue-700 ${isActive('/dashboard/settings')}`}
                onClick={() => setIsOpen(false)}
              >
                Settings
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;