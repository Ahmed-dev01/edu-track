import React from 'react';
import { useStudent } from '../../context/StudentContext';
import {
  LayoutDashboard,
  User,
  BookOpen,
  CalendarCheck,
  Award,
  Clock,
  FileCheck2,
  BellRing,
  Settings,
  LogOut,
  X,
  Sparkles,
} from 'lucide-react';
import { NavItem } from '../../types';

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
  onLogoutClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isMobileOpen,
  onMobileClose,
  mobileOpen,
  setMobileOpen,
  onLogoutClick,
}) => {
  const {
    activeTab,
    setActiveTab,
    studentProfile,
    assignments,
    notices,
    setIsLogoutModalOpen,
  } = useStudent();

  const isOpen = isMobileOpen ?? mobileOpen ?? false;
  const handleClose = () => {
    if (onMobileClose) onMobileClose();
    if (setMobileOpen) setMobileOpen(false);
  };

  const handleLogout = () => {
    if (onLogoutClick) {
      onLogoutClick();
    } else {
      setIsLogoutModalOpen(true);
    }
  };

  const pendingAssignmentsCount = assignments.filter((a) => a.status === 'Pending').length;
  const importantNoticesCount = notices.filter((n) => n.isImportant).length;

  const navItems: {
    id: NavItem;
    label: string;
    icon: React.ElementType;
    badge?: number | string;
  }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'courses', label: 'Courses', icon: BookOpen, badge: '6' },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck, badge: '92.5%' },
    { id: 'results', label: 'Results', icon: Award, badge: '3.84' },
    { id: 'timetable', label: 'Timetable', icon: Clock },
    { id: 'assignments', label: 'Assignments', icon: FileCheck2, badge: pendingAssignmentsCount > 0 ? pendingAssignmentsCount : undefined },
    { id: 'notices', label: 'Notices', icon: BellRing, badge: importantNoticesCount > 0 ? `${importantNoticesCount}` : undefined },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (tabId: NavItem) => {
    setActiveTab(tabId);
    handleClose();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={handleClose}
        />
      )}

      {/* Sleek Sidebar Container */}
      <aside
        id="edutrack-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#1E293B] text-slate-400 flex-shrink-0 flex flex-col border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sleek Logo & Header */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3 select-none">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md shadow-indigo-500/30">
              E
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-xl tracking-tight font-display">
                EduTrack
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-indigo-400">
                Portal v2.4
              </span>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Term Pill Indicator */}
        <div className="px-4 pb-2">
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-slate-200">{studentProfile.semester}</span>
            </div>
            <span className="text-[10px] font-bold text-indigo-400 bg-indigo-950/70 px-2 py-0.5 rounded border border-indigo-800/50">
              Spring '26
            </span>
          </div>
        </div>

        {/* Sleek Navigation Menu */}
        <nav className="flex-1 px-4 space-y-1 mt-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-150 group text-left ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-400 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <Icon
                    className={`w-5 h-5 transition-colors shrink-0 ${
                      isActive
                        ? 'text-indigo-400'
                        : 'text-slate-400 group-hover:text-white'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      isActive
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Honor Tag */}
        <div className="px-4 py-2">
          <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/40 flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">Dean's List Cohort</p>
              <p className="text-[10px] text-slate-400 truncate">Computer Science Dept</p>
            </div>
          </div>
        </div>

        {/* Sleek Bottom User Section */}
        <div className="p-4 mt-auto border-t border-slate-700/80 bg-slate-900/60">
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleNavClick('profile')}
              className="flex items-center space-x-3 text-left min-w-0 group hover:opacity-90 transition-opacity"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-400 border-2 border-white/80 overflow-hidden flex items-center justify-center font-bold text-white uppercase shrink-0 shadow-sm">
                <img
                  src={studentProfile.avatar}
                  alt={studentProfile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">
                  {studentProfile.name}
                </p>
                <p className="text-xs text-slate-400 truncate font-mono">
                  ID: {studentProfile.studentId}
                </p>
              </div>
            </button>

            <button
              id="sidebar-logout-btn"
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors shrink-0 ml-1"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
