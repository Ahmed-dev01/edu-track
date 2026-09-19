import React, { useState, useEffect, useRef } from 'react';
import { useStudent } from '../../context/StudentContext';
import { Search, X, BookOpen, Calendar, FileText, Bell, User, CheckSquare, BarChart3, Clock, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NavItem } from '../../types';

interface SearchModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    isSearchOpen: contextSearchOpen,
    setIsSearchOpen: setContextSearchOpen,
    courses,
    assignments,
    notices,
    setActiveTab,
  } = useStudent();

  const isModalOpen = isOpen !== undefined ? isOpen : contextSearchOpen;
  const handleCloseModal = () => {
    if (onClose) onClose();
    setContextSearchOpen(false);
  };

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isModalOpen]);

  // Keyboard shortcut Ctrl/Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setContextSearchOpen(!contextSearchOpen);
      }
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, contextSearchOpen]);

  if (!isModalOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Pages navigation list
  const pages: { id: NavItem; title: string; desc: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', title: 'Dashboard Overview', desc: 'Main academic statistics and timeline', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'profile', title: 'My Student Profile', desc: 'Personal details, advisor, ID card', icon: <User className="w-4 h-4" /> },
    { id: 'courses', title: 'Enrolled Courses', desc: 'View course syllabi, credits, instructors', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'attendance', title: 'Attendance Analytics', desc: 'Overall rates, subject logs, excuse request', icon: <Calendar className="w-4 h-4" /> },
    { id: 'results', title: 'Academic Results & CGPA', desc: 'Grades, marks breakdown, GPA simulator', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'timetable', title: 'Weekly Timetable', desc: 'Class slots, rooms, daily schedules', icon: <Clock className="w-4 h-4" /> },
    { id: 'assignments', title: 'Assignments & Projects', desc: 'Pending submissions, deadlines, scores', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'notices', title: 'University Notices', desc: 'Campus announcements and circulars', icon: <Bell className="w-4 h-4" /> },
    { id: 'settings', title: 'Portal Settings', desc: 'Preferences, security, notifications', icon: <FileText className="w-4 h-4" /> },
  ];

  const matchedPages = cleanQuery
    ? pages.filter((p) => p.title.toLowerCase().includes(cleanQuery) || p.desc.toLowerCase().includes(cleanQuery))
    : pages.slice(0, 4);

  const matchedCourses = cleanQuery
    ? courses.filter((c) => c.name.toLowerCase().includes(cleanQuery) || c.code.toLowerCase().includes(cleanQuery) || c.instructor.name.toLowerCase().includes(cleanQuery))
    : [];

  const matchedAssignments = cleanQuery
    ? assignments.filter((a) => a.title.toLowerCase().includes(cleanQuery) || a.courseCode.toLowerCase().includes(cleanQuery))
    : [];

  const matchedNotices = cleanQuery
    ? notices.filter((n) => n.title.toLowerCase().includes(cleanQuery) || n.category.toLowerCase().includes(cleanQuery))
    : [];

  const handleSelect = (tab: NavItem) => {
    setActiveTab(tab);
    handleCloseModal();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseModal}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200 dark:bg-slate-900 dark:border-slate-800 z-10 max-h-[80vh] flex flex-col"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search courses, assignments, notices, grades, or pages... (ESC to close)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none dark:text-white"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <div className="overflow-y-auto p-4 space-y-4 max-h-[60vh]">
            {/* Quick Navigation Pages */}
            {matchedPages.length > 0 && (
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-2">
                  Portal Navigation
                </p>
                <div className="space-y-1">
                  {matchedPages.map((page) => (
                    <button
                      key={page.id}
                      onClick={() => handleSelect(page.id)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                          {page.icon}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                            {page.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {page.desc}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Courses Matches */}
            {matchedCourses.length > 0 && (
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-2">
                  Courses
                </p>
                <div className="space-y-1">
                  {matchedCourses.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleSelect('courses')}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-md">
                          {c.code}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                            {c.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {c.instructor.name} • {c.room}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-slate-400">{c.credits} Credits</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Assignments Matches */}
            {matchedAssignments.length > 0 && (
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-2">
                  Assignments
                </p>
                <div className="space-y-1">
                  {matchedAssignments.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => handleSelect('assignments')}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-500">{a.courseCode}</span>
                          <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                            {a.title}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Due: {a.dueDate} ({a.status})
                        </p>
                      </div>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        a.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                        a.status === 'Overdue' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' :
                        'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {a.status}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Notices Matches */}
            {matchedNotices.length > 0 && (
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-2">
                  Announcements
                </p>
                <div className="space-y-1">
                  {matchedNotices.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => handleSelect('notices')}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                          {n.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {n.category} • {n.date}
                        </p>
                      </div>
                      {n.isImportant && (
                        <span className="text-[10px] uppercase font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded dark:bg-rose-950 dark:text-rose-300">
                          Urgent
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {cleanQuery && matchedCourses.length === 0 && matchedAssignments.length === 0 && matchedNotices.length === 0 && matchedPages.length === 0 && (
              <div className="text-center py-8">
                <Search className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  No matching records found
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Try searching for "Database", "Attendance", "Grade", or "Midterm".
                </p>
              </div>
            )}
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 px-4 py-2.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Navigation: Press <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded border border-slate-300 dark:border-slate-600 text-[10px]">Tab</kbd> or <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded border border-slate-300 dark:border-slate-600 text-[10px]">Enter</kbd></span>
            <span>EduTrack Portal v3.4</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
