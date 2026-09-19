import React, { useState } from 'react';
import { useStudent } from '../../context/StudentContext';
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  FilePlus2,
  Filter,
  Search,
  ChevronDown,
  Info,
  Calendar,
  X,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

export const AttendancePage: React.FC = () => {
  const {
    attendanceSummaries,
    attendanceLogs,
    monthlyAttendance,
    logAttendanceExcuse,
    courses,
    isDarkMode,
  } = useStudent();

  const [statusFilter, setStatusFilter] = useState<'All' | 'Present' | 'Absent' | 'Late'>('All');
  const [courseFilter, setCourseFilter] = useState<string>('All');
  const [searchDate, setSearchDate] = useState<string>('');
  const [isExcuseModalOpen, setIsExcuseModalOpen] = useState(false);

  // Excuse Form State
  const [excuseCourse, setExcuseCourse] = useState(courses[0]?.code || 'CSE-311');
  const [excuseDate, setExcuseDate] = useState(new Date().toISOString().split('T')[0]);
  const [excuseReason, setExcuseReason] = useState('');

  // Total summary counts
  const totalPresent = attendanceSummaries.reduce((sum, s) => sum + s.present, 0);
  const totalAbsent = attendanceSummaries.reduce((sum, s) => sum + s.absent, 0);
  const totalLate = attendanceSummaries.reduce((sum, s) => sum + s.late, 0);
  const totalClasses = attendanceSummaries.reduce((sum, s) => sum + s.totalClasses, 0);
  const overallPercentage = Math.round((totalPresent / totalClasses) * 100 * 10) / 10;

  // Filter logs
  const filteredLogs = attendanceLogs.filter((log) => {
    const matchesStatus = statusFilter === 'All' || log.status === statusFilter;
    const matchesCourse = courseFilter === 'All' || log.courseCode === courseFilter;
    const matchesDate = !searchDate || log.date.includes(searchDate);
    return matchesStatus && matchesCourse && matchesDate;
  });

  const handleExcuseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!excuseReason.trim()) return;
    logAttendanceExcuse(excuseCourse, excuseDate, excuseReason);
    setExcuseReason('');
    setIsExcuseModalOpen(false);
  };

  return (
    <div id="edutrack-attendance-view" className="space-y-6 animate-in fade-in duration-200">
      {/* Top 4 Attendance Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Overall Percentage */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">Overall Attendance</span>
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <CalendarCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
              {overallPercentage}%
            </h3>
            <span className="text-green-500 text-xs font-bold bg-green-50 dark:bg-green-950/60 px-2 py-1 rounded">
              Eligible
            </span>
          </div>
          <div className="mt-3">
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 dark:bg-emerald-500 rounded-full" style={{ width: `${overallPercentage}%` }} />
            </div>
          </div>
        </div>

        {/* Present Days */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">Present Classes</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
              {totalPresent}
            </h3>
            <span className="text-slate-400 text-xs font-medium">of {totalClasses}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            Verified in active biometric logs
          </p>
        </div>

        {/* Absent Days */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">Absent Classes</span>
            <span className="p-1.5 rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
              <XCircle className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
              {totalAbsent}
            </h3>
            <span className="text-amber-500 text-xs font-bold bg-amber-50 dark:bg-amber-950/60 px-2 py-1 rounded">2 Excused</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            Medical excuses validated by Dean
          </p>
        </div>

        {/* Late Days */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">Late Arrivals</span>
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
              {totalLate}
            </h3>
            <span className="text-slate-400 text-xs font-medium">Recorded</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            Under 15 minutes grace window
          </p>
        </div>
      </div>

      {/* Monthly Attendance Chart & Policy Notice */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Bar Chart */}
        <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                Monthly Attendance Breakdown
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Detailed session status per calendar month
              </p>
            </div>
            <button
              onClick={() => setIsExcuseModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all"
            >
              <FilePlus2 className="w-3.5 h-3.5" />
              <span>Submit Absence Excuse</span>
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyAttendance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#f1f5f9'} />
                <XAxis dataKey="month" stroke={isDarkMode ? '#94a3b8' : '#64748b'} fontSize={12} tickLine={false} />
                <YAxis stroke={isDarkMode ? '#94a3b8' : '#64748b'} fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="present" name="Present" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="late" name="Late" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="absent" name="Absent" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* University Attendance Regulations */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>University Attendance Rule</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block">
                  &gt;= 75% — Regular Standing
                </span>
                Eligible to sit for all final exams and practical assessments.
              </div>

              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/40">
                <span className="font-bold text-amber-800 dark:text-amber-300 block">
                  65% – 74.9% — Non-Collegiate Status
                </span>
                Requires Dean's special approval and penalty fine payment.
              </div>

              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/40">
                <span className="font-bold text-rose-800 dark:text-rose-300 block">
                  &lt; 65% — Disbarred Status
                </span>
                Automatic course retake in the following academic year.
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 text-center">
            Last synced with campus biometric scanner: Today at 08:30 AM
          </div>
        </div>
      </div>

      {/* Subject-Wise Attendance Breakdown Cards */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-800 dark:text-white mb-4">
          Subject-Wise Attendance Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {attendanceSummaries.map((item) => {
            const isSafe = item.percentage >= 75;
            return (
              <div
                key={item.courseCode}
                className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {item.courseCode}
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white line-clamp-1">
                      {item.courseName}
                    </h4>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSafe
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
                    {item.percentage}%
                  </span>
                </div>

                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${isSafe ? 'bg-emerald-500' : 'bg-rose-500'}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-1">
                  <div className="bg-white dark:bg-slate-800 p-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                    <span className="text-slate-400 block">Present</span>
                    <span className="font-bold text-emerald-600">{item.present}</span>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                    <span className="text-slate-400 block">Absent</span>
                    <span className="font-bold text-rose-600">{item.absent}</span>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                    <span className="text-slate-400 block">Late</span>
                    <span className="font-bold text-amber-600">{item.late}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Attendance Activity Logs Table */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              Recent Attendance Session Logs
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Verified daily card punch-in records
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter */}
            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
              {(['All', 'Present', 'Absent', 'Late'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    statusFilter === st
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-bold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Course Filter */}
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
            >
              <option value="All">All Courses</option>
              {courses.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-400 uppercase font-bold tracking-widest border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">Date & Time</th>
                <th className="px-4 py-3">Course Code & Name</th>
                <th className="px-4 py-3">Room</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Remarks / Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredLogs.map((log) => {
                const isPres = log.status === 'Present';
                const isAbs = log.status === 'Absent';

                return (
                  <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-white">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{log.date}</span>
                        <span className="text-slate-400">({log.time})</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 mr-2">
                        {log.courseCode}
                      </span>
                      <span className="text-slate-700 dark:text-slate-300">{log.courseName}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{log.room}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          isPres
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                            : isAbs
                            ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                        }`}
                      >
                        {isPres ? <CheckCircle2 className="w-3 h-3" /> : isAbs ? <XCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {log.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 italic">
                      {log.remarks || 'Biometric Scanner Verified'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Excuse Request Modal */}
      {isExcuseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setIsExcuseModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              Request Attendance Leave / Excuse
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Submit your absence justification for instructor review and attendance reconciliation.
            </p>

            <form onSubmit={handleExcuseSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Select Course
                </label>
                <select
                  value={excuseCourse}
                  onChange={(e) => setExcuseCourse(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  {courses.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} — {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Absence Date
                </label>
                <input
                  type="date"
                  value={excuseDate}
                  onChange={(e) => setExcuseDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Reason for Absence
                </label>
                <textarea
                  rows={3}
                  value={excuseReason}
                  onChange={(e) => setExcuseReason(e.target.value)}
                  placeholder="E.g., Medical fever, University hackathon team representation, family emergency..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsExcuseModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
