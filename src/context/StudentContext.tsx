import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudentProfile,
  Course,
  AttendanceRecord,
  CourseAttendanceSummary,
  MonthlyAttendance,
  SemesterResult,
  TimetableSlot,
  Assignment,
  UniversityNotice,
  NotificationItem,
  UserSettings,
  NavItem,
} from '../types';
import {
  initialStudentProfile,
  initialCourses,
  courseAttendanceSummaries,
  monthlyAttendanceData,
  attendanceLogs,
  academicResultsHistory,
  weeklyTimetableSlots,
  initialAssignments,
  universityNotices,
  initialNotifications,
  defaultSettings,
} from '../data/mockData';

export interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: number;
}

interface StudentContextType {
  // Auth state
  isAuthenticated: boolean;
  login: (email: string, pass: string, remember: boolean) => boolean;
  logout: () => void;

  // Navigation
  activeTab: NavItem;
  setActiveTab: (tab: NavItem) => void;
  selectedSemester: string;
  setSelectedSemester: (sem: string) => void;

  // Theme
  isDarkMode: boolean;
  toggleTheme: () => void;
  toggleDarkMode: () => void;
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;

  // Data States
  studentProfile: StudentProfile;
  updateProfile: (data: Partial<StudentProfile>) => void;
  
  courses: Course[];
  assignments: Assignment[];
  submitAssignment: (assignmentId: string, fileName: string, notes?: string) => void;
  
  attendanceSummaries: CourseAttendanceSummary[];
  attendanceLogs: AttendanceRecord[];
  monthlyAttendance: MonthlyAttendance[];
  logAttendanceExcuse: (courseCode: string, date: string, reason: string) => void;
  
  academicHistory: SemesterResult[];
  weeklyTimetable: TimetableSlot[];
  
  notices: UniversityNotice[];
  bookmarkedNotices: string[];
  toggleBookmarkNotice: (id: string) => void;
  
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadNotificationsCount: number;

  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  resetAllData: () => void;

  // Global UI
  toasts: Toast[];
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLogoutModalOpen: boolean;
  setIsLogoutModalOpen: (open: boolean) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

const STORAGE_KEYS = {
  AUTH: 'edutrack_auth',
  PROFILE: 'edutrack_profile',
  ASSIGNMENTS: 'edutrack_assignments',
  ATTENDANCE_LOGS: 'edutrack_attendance_logs',
  NOTICES_BOOKMARKS: 'edutrack_notice_bookmarks',
  SETTINGS: 'edutrack_settings',
  THEME: 'edutrack_theme',
};

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AUTH);
    return saved !== null ? JSON.parse(saved) : true; // Default true so user sees dashboard immediately, but can test login
  });

  // Navigation
  const [activeTab, setActiveTab] = useState<NavItem>('dashboard');
  const [selectedSemester, setSelectedSemester] = useState<string>('Spring 2026');

  // Theme
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Student Profile
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return saved ? JSON.parse(saved) : initialStudentProfile;
  });

  // Courses
  const [courses] = useState<Course[]>(initialCourses);

  // Assignments
  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
    return saved ? JSON.parse(saved) : initialAssignments;
  });

  // Attendance
  const [attendanceLogsState, setAttendanceLogsState] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ATTENDANCE_LOGS);
    return saved ? JSON.parse(saved) : attendanceLogs;
  });
  const [attendanceSummaries] = useState<CourseAttendanceSummary[]>(courseAttendanceSummaries);
  const [monthlyAttendance] = useState<MonthlyAttendance[]>(monthlyAttendanceData);

  // Results & Timetable
  const [academicHistory] = useState<SemesterResult[]>(academicResultsHistory);
  const [weeklyTimetable] = useState<TimetableSlot[]>(weeklyTimetableSlots);

  // Notices & Bookmarks
  const [notices] = useState<UniversityNotice[]>(universityNotices);
  const [bookmarkedNotices, setBookmarkedNotices] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTICES_BOOKMARKS);
    return saved ? JSON.parse(saved) : ['not-1'];
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  // Settings
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Sync theme with DOM
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(STORAGE_KEYS.THEME, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(STORAGE_KEYS.THEME, 'light');
    }
  }, [isDarkMode]);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(studentProfile));
  }, [studentProfile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE_LOGS, JSON.stringify(attendanceLogsState));
  }, [attendanceLogsState]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTICES_BOOKMARKS, JSON.stringify(bookmarkedNotices));
  }, [bookmarkedNotices]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  // Toast helper
  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type, timestamp: Date.now() }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth methods
  const login = (email: string, pass: string, remember: boolean) => {
    if (email && pass.length >= 4) {
      setIsAuthenticated(true);
      if (remember) {
        localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(true));
      }
      addToast('Welcome Back!', `Signed in as ${studentProfile.name}`, 'success');
      return true;
    }
    addToast('Authentication Failed', 'Please provide a valid email and password.', 'error');
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    setActiveTab('dashboard');
    addToast('Signed Out', 'You have been successfully logged out of EduTrack.', 'info');
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const setThemeMode = (mode: 'light' | 'dark' | 'system') => {
    if (mode === 'dark') {
      setIsDarkMode(true);
    } else if (mode === 'light') {
      setIsDarkMode(false);
    } else {
      const isSysDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(isSysDark);
    }
    setSettings((prev) => ({ ...prev, theme: mode }));
  };

  // Profile methods
  const updateProfile = (data: Partial<StudentProfile>) => {
    setStudentProfile((prev) => ({ ...prev, ...data }));
    addToast('Profile Updated', 'Your student information was saved successfully.', 'success');
  };

  // Assignment methods
  const submitAssignment = (assignmentId: string, fileName: string, notes?: string) => {
    const dateStr = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === assignmentId
          ? {
              ...a,
              status: 'Completed' as const,
              submittedDate: dateStr,
              submittedFile: fileName,
              feedback: notes ? `Notes submitted: "${notes}" — Pending instructor evaluation.` : 'Submitted on time. Pending instructor review.',
            }
          : a
      )
    );
    addToast('Assignment Submitted!', `"${fileName}" uploaded successfully.`, 'success');
  };

  // Attendance Excuse
  const logAttendanceExcuse = (courseCode: string, date: string, reason: string) => {
    const newRecord: AttendanceRecord = {
      id: 'att-exc-' + Date.now(),
      courseCode,
      courseName: courses.find((c) => c.code === courseCode)?.name || courseCode,
      date,
      time: '09:00 AM',
      status: 'Late',
      room: 'Online Portal',
      remarks: `Excuse Request: ${reason} (Pending Verification)`,
    };
    setAttendanceLogsState((prev) => [newRecord, ...prev]);
    addToast('Excuse Request Submitted', `Your explanation for ${courseCode} on ${date} has been sent to the instructor.`, 'info');
  };

  // Notices methods
  const toggleBookmarkNotice = (id: string) => {
    setBookmarkedNotices((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        addToast('Notice Removed', 'Removed notice from saved bookmarks.', 'info');
        return prev.filter((item) => item !== id);
      } else {
        addToast('Notice Saved', 'Added notice to your saved bookmarks.', 'success');
        return [...prev, id];
      }
    });
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('Notifications Cleared', 'All notifications marked as read.', 'info');
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  // Settings
  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    addToast('Settings Saved', 'Your portal preferences have been updated.', 'success');
  };

  const resetAllData = () => {
    localStorage.clear();
    setStudentProfile(initialStudentProfile);
    setAssignments(initialAssignments);
    setAttendanceLogsState(attendanceLogs);
    setBookmarkedNotices(['not-1']);
    setNotifications(initialNotifications);
    setSettings(defaultSettings);
    addToast('Data Reset', 'All demo data restored to initial university state.', 'info');
  };

  return (
    <StudentContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        activeTab,
        setActiveTab,
        selectedSemester,
        setSelectedSemester,
        isDarkMode,
        toggleTheme,
        toggleDarkMode: toggleTheme,
        setThemeMode,
        studentProfile,
        updateProfile,
        courses,
        assignments,
        submitAssignment,
        attendanceSummaries,
        attendanceLogs: attendanceLogsState,
        monthlyAttendance,
        logAttendanceExcuse,
        academicHistory,
        weeklyTimetable,
        notices,
        bookmarkedNotices,
        toggleBookmarkNotice,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        unreadNotificationsCount,
        settings,
        updateSettings,
        resetAllData,
        toasts,
        addToast,
        removeToast,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        isLogoutModalOpen,
        setIsLogoutModalOpen,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};
