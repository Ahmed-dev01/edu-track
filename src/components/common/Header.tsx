import React, { useState, useRef, useEffect } from 'react';
import { useStudent } from '../../context/StudentContext';
import {
  Menu,
  Search,
  Moon,
  Sun,
  Bell,
  Check,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from 'lucide-react';
import { NavItem } from '../../types';

interface HeaderProps {
  onMenuClick?: () => void;
  onOpenMobileSidebar?: () => void;
  onLogoutClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  onOpenMobileSidebar,
  onLogoutClick,
}) => {
  const {
    activeTab,
    setActiveTab,
    isDarkMode,
    toggleTheme,
    studentProfile,
    notifications,
    unreadNotificationsCount,
    markNotificationRead,
    markAllNotificationsRead,
    setIsSearchOpen,
    selectedSemester,
    setSelectedSemester,
    setIsLogoutModalOpen,
  } = useStudent();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSemesterSelect, setShowSemesterSelect] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const semesterRef = useRef<HTMLDivElement>(null);

  const handleOpenMenu = () => {
    if (onOpenMobileSidebar) onOpenMobileSidebar();
    if (onMenuClick) onMenuClick();
  };

  const handleLogout = () => {
    if (onLogoutClick) onLogoutClick();
    else setIsLogoutModalOpen(true);
  };

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (semesterRef.current && !semesterRef.current.contains(event.target as Node)) {
        setShowSemesterSelect(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const pageTitles: Record<NavItem, { title: string; subtitle: string }> = {
    dashboard: { title: 'Student Dashboard', subtitle: 'Academic overview and daily campus schedule' },
    profile: { title: 'Student Profile', subtitle: 'Personal identification and academic enrollment records' },
    courses: { title: 'Enrolled Courses', subtitle: 'Current semester curriculum, syllabi, and faculty' },
    attendance: { title: 'Attendance Analytics', subtitle: 'Attendance records, compliance metrics, and excuse logs' },
    results: { title: 'Academic Results & GPA', subtitle: 'Semester transcripts, grade distributions, and CGPA trends' },
    timetable: { title: 'Weekly Class Timetable', subtitle: 'Classroom allocations and lecture schedules' },
    assignments: { title: 'Assignments & Projects', subtitle: 'Submissions, project deadlines, and instructor evaluations' },
    notices: { title: 'University Notices & Circulars', subtitle: 'Official administrative announcements and campus events' },
    settings: { title: 'Portal Settings', subtitle: 'User preferences, notification channels, and security' },
  };

  const currentInfo = pageTitles[activeTab] || pageTitles.dashboard;
  const semesters = ['Spring 2026', 'Fall 2025', 'Spring 2025', 'Fall 2024'];

  const handleNotificationClick = (id: string, linkTo?: NavItem) => {
    markNotificationRead(id);
    if (linkTo) {
      setActiveTab(linkTo);
      setShowNotifications(false);
    }
  };

  return (
    <header
      id="edutrack-header"
      className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 transition-colors"
    >
      {/* Left: Mobile Menu & Page Title */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleOpenMenu}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white">
            {currentInfo.title}
          </h1>
        </div>
      </div>

      {/* Right: Sleek Actions Bar */}
      <div className="flex items-center space-x-3 sm:space-x-6">
        {/* Sleek Search Input Trigger */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </span>
          <input
            type="text"
            readOnly
            onClick={() => setIsSearchOpen(true)}
            placeholder="Search classes, results..."
            className="block w-40 sm:w-64 pl-9 pr-3 py-1.5 sm:py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
          />
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Semester Selector Dropdown */}
          <div className="relative hidden md:block" ref={semesterRef}>
            <button
              onClick={() => setShowSemesterSelect(!showSemesterSelect)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <span>{selectedSemester}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showSemesterSelect && (
              <div className="absolute right-0 mt-2 w-40 rounded-xl bg-white p-1.5 shadow-xl border border-slate-200 dark:bg-slate-900 dark:border-slate-800 z-50 animate-in fade-in zoom-in-95 duration-100">
                <p className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1">
                  Select Term
                </p>
                {semesters.map((sem) => (
                  <button
                    key={sem}
                    onClick={() => {
                      setSelectedSemester(sem);
                      setShowSemesterSelect(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium text-left transition-colors ${
                      selectedSemester === sem
                        ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{sem}</span>
                    {selectedSemester === sem && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Switcher Button */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-500" />
            )}
          </button>

          {/* Notifications Trigger */}
          <div className="relative" ref={notifRef}>
            <button
              id="notifications-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-slate-200 dark:bg-slate-900 dark:border-slate-800 z-50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Notifications
                    </h3>
                    {unreadNotificationsCount > 0 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                        {unreadNotificationsCount} unread
                      </span>
                    )}
                  </div>
                  {unreadNotificationsCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-500">
                      No new notifications right now.
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => handleNotificationClick(n.id, n.linkTo)}
                        className={`p-3.5 flex items-start space-x-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer ${
                          !n.read ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : ''
                        }`}
                      >
                        <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${!n.read ? 'bg-indigo-600' : 'bg-transparent'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900 dark:text-white">
                            {n.title}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                            {n.message}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-1">
                            {n.time}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
                  <button
                    onClick={() => {
                      setActiveTab('notices');
                      setShowNotifications(false);
                    }}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    View All Campus Announcements →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              id="user-profile-menu-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <img
                src={studentProfile.avatar}
                alt={studentProfile.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
              />
              <ChevronDown className="hidden sm:block w-3.5 h-3.5 text-slate-400" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white p-2 shadow-2xl border border-slate-200 dark:bg-slate-900 dark:border-slate-800 z-50">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {studentProfile.name}
                  </p>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                    {studentProfile.studentId}
                  </p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setActiveTab('profile');
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>My Profile & ID</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('settings');
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span>Account & Settings</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-left transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
