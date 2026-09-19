/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StudentProvider, useStudent } from './context/StudentContext';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { ToastContainer } from './components/common/ToastContainer';
import { SearchModal } from './components/common/SearchModal';
import { ConfirmModal } from './components/common/ConfirmModal';

// Pages
import { LoginPage } from './components/pages/LoginPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { CoursesPage } from './components/pages/CoursesPage';
import { AttendancePage } from './components/pages/AttendancePage';
import { ResultsPage } from './components/pages/ResultsPage';
import { TimetablePage } from './components/pages/TimetablePage';
import { AssignmentsPage } from './components/pages/AssignmentsPage';
import { NoticesPage } from './components/pages/NoticesPage';
import { SettingsPage } from './components/pages/SettingsPage';

const DashboardLayout: React.FC = () => {
  const {
    isAuthenticated,
    activeTab,
    isSearchOpen,
    setIsSearchOpen,
    isLogoutModalOpen,
    setIsLogoutModalOpen,
    logout,
  } = useStudent();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // If user is not logged in, display the modern split-screen LoginPage
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <LoginPage />
        <ToastContainer />
      </div>
    );
  }

  // Render the requested active page tab
  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'profile':
        return <ProfilePage />;
      case 'courses':
        return <CoursesPage />;
      case 'attendance':
        return <AttendancePage />;
      case 'results':
        return <ResultsPage />;
      case 'timetable':
        return <TimetablePage />;
      case 'assignments':
        return <AssignmentsPage />;
      case 'notices':
        return <NoticesPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50/80 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Navigation Sidebar */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Navbar */}
        <Header onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)} />

        {/* Dynamic Page Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActivePage()}
        </main>

        {/* Global Footer */}
        <footer className="py-6 px-8 border-t border-slate-200/80 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-900/50">
          <p>
            © 2026 EduTrack University Portal. All rights reserved. • Connected as Student
          </p>
        </footer>
      </div>

      {/* Global Modals & Notifications */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={logout}
        title="Sign Out of EduTrack"
        description="Are you sure you want to end your current student session? You can sign back in at any time."
        confirmText="Yes, Sign Out"
        type="danger"
      />

      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StudentProvider>
      <DashboardLayout />
    </StudentProvider>
  );
}
