// frontend/src/components/DashboardLayout.js
import React from 'react';
import DashboardSidebar from './DashboardSidebar';
import MobileMenu from './MobileMenu';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <DashboardSidebar />
      <MobileMenu />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default DashboardLayout;