import React, { useState } from 'react';
import { useStudent } from '../../context/StudentContext';
import {
  Settings,
  Moon,
  Sun,
  Lock,
  Bell,
  Globe,
  Shield,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Download,
  Trash2,
  Save,
  KeyRound,
  Sliders,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const {
    isDarkMode,
    toggleDarkMode,
    settings,
    updateSettings,
    studentProfile,
    courses,
    assignments,
    academicHistory,
  } = useStudent();

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // General Settings State
  const [notifState, setNotifState] = useState({
    emailNotifs: settings.emailNotifications,
    smsAlerts: settings.smsAlerts,
    assignmentReminders: settings.assignmentReminders,
    examAlerts: settings.examAlerts,
    twoFactor: settings.twoFactorAuth,
    language: settings.language,
  });

  const [savedFeedback, setSavedFeedback] = useState(false);

  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 8) score += 25;
    if (/[A-Z]/.test(pass)) score += 25;
    if (/[0-9]/.test(pass)) score += 25;
    if (/[^A-Za-z0-9]/.test(pass)) score += 25;
    return score;
  };

  const passwordStrength = calculatePasswordStrength(newPassword);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (currentPassword !== 'student123') {
      setPasswordError('Incorrect current password. (Demo password is "student123")');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match.');
      return;
    }

    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      emailNotifications: notifState.emailNotifs,
      smsAlerts: notifState.smsAlerts,
      assignmentReminders: notifState.assignmentReminders,
      examAlerts: notifState.examAlerts,
      twoFactorAuth: notifState.twoFactor,
      language: notifState.language,
    });
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 3000);
  };

  const handleExportData = () => {
    const data = {
      studentProfile,
      courses,
      assignments,
      academicHistory,
      exportDate: new Date().toISOString(),
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `edutrack_${studentProfile.studentId}_backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div id="edutrack-settings-view" className="space-y-6 animate-in fade-in duration-200">
      {/* Settings Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Account & System Settings
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your interface appearance, security credentials, and alert notifications
          </p>
        </div>

        {savedFeedback && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Preferences saved successfully!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Preferences & Password */}
        <div className="lg:col-span-2 space-y-6">
          {/* Appearance & Theme Preference */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Appearance & Theme</span>
            </h3>

            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-indigo-950 text-indigo-300' : 'bg-amber-50 text-amber-600'}`}>
                  {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">
                    {isDarkMode ? 'Dark Mode Active' : 'Light Mode Active'}
                  </p>
                  <p className="text-xs text-slate-400">
                    Saves automatically to browser localStorage
                  </p>
                </div>
              </div>

              <button
                id="toggle-theme-setting-btn"
                onClick={toggleDarkMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isDarkMode ? 'bg-indigo-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Security & Password Change */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Change Student Account Password</span>
            </h3>

            {passwordError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-100 dark:border-rose-900/50 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/50 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Password has been successfully updated!</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPw ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password (demo: student123)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white pr-10 focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPw(!showCurrentPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New Password & Strength */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPw ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white pr-10 focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPw(!showNewPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password Strength Meter */}
                  {newPassword && (
                    <div className="mt-2 space-y-1">
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            passwordStrength <= 25
                              ? 'bg-rose-500 w-1/4'
                              : passwordStrength <= 50
                              ? 'bg-amber-500 w-2/4'
                              : passwordStrength <= 75
                              ? 'bg-blue-500 w-3/4'
                              : 'bg-emerald-500 w-full'
                          }`}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400">
                        Strength: {passwordStrength <= 50 ? 'Weak' : passwordStrength <= 75 ? 'Good' : 'Strong'}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPw ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white pr-10 focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPw(!showConfirmPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>

          {/* Notifications Preferences */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Notification Preferences</span>
            </h3>

            <form onSubmit={handleSavePreferences} className="space-y-4">
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 cursor-pointer">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      Email Circulars & Notices
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Receive critical campus circulars to alex.morgan@university.edu
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifState.emailNotifs}
                    onChange={(e) => setNotifState({ ...notifState, emailNotifs: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 cursor-pointer">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      Assignment Deadline Alerts
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Receive alerts 24 hours prior to submission deadlines
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifState.assignmentReminders}
                    onChange={(e) => setNotifState({ ...notifState, assignmentReminders: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 cursor-pointer">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      SMS Exam & Result Alerts
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Immediate SMS notification when semester grades are published
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifState.smsAlerts}
                    onChange={(e) => setNotifState({ ...notifState, smsAlerts: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                </label>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Preferences</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Col: Language & Data Export */}
        <div className="space-y-6">
          {/* Language & Regional */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Language & Locale</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Portal Display Language
                </label>
                <select
                  value={notifState.language}
                  onChange={(e) => setNotifState({ ...notifState, language: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  <option value="en">English (United States)</option>
                  <option value="es">Español (Spanish)</option>
                  <option value="fr">Français (French)</option>
                  <option value="de">Deutsch (German)</option>
                  <option value="zh">中文 (Mandarin)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Timezone Standard
                </label>
                <input
                  type="text"
                  disabled
                  value="America/New_York (EST, UTC-5)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-slate-50 dark:bg-slate-800 text-slate-500"
                />
              </div>
            </div>
          </div>

          {/* Student Data Portability */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Data Portability</span>
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Download a complete archive copy of your enrolled courses, assignment submissions, attendance sheets, and academic records.
            </p>

            <button
              onClick={handleExportData}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Export Academic Data (JSON)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
