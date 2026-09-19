import React from 'react';
import { useStudent } from '../../context/StudentContext';
import { StatCard } from '../common/StatCard';
import {
  BookOpen,
  CalendarCheck,
  Award,
  FileCheck2,
  Clock,
  BellRing,
  Calendar,
  ChevronRight,
  Sparkles,
  MapPin,
} from 'lucide-react';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const {
    studentProfile,
    courses,
    assignments,
    monthlyAttendance,
    weeklyTimetable,
    notices,
    setActiveTab,
    isDarkMode,
  } = useStudent();

  // Calculate stats
  const totalCredits = courses.reduce((acc, c) => acc + c.credits, 0);
  const pendingAssignments = assignments.filter((a) => a.status === 'Pending');
  const avgAttendance = 94.2;

  // Today's classes (Monday default for demo)
  const currentDay = 'Monday';
  const todayClasses = weeklyTimetable.filter((t) => t.day === currentDay);

  // Subject color mapper for initial avatars
  const getSubjectInitials = (code: string) => {
    return code.substring(0, 2).toUpperCase();
  };

  const getSubjectColor = (code: string) => {
    const char = code.charAt(0);
    if (char === 'C') return 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400';
    if (char === 'M') return 'bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400';
    if (char === 'P' || char === 'E') return 'bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-400';
    return 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400';
  };

  // Custom Chart Tooltip
  const CustomChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl bg-slate-900/95 p-3 text-xs text-white shadow-xl border border-slate-700 backdrop-blur-md">
          <p className="font-bold text-slate-200">{label} Attendance</p>
          <div className="mt-1 space-y-0.5">
            <p className="text-emerald-400 font-semibold">
              Rate: {payload[0].payload.rate}%
            </p>
            <p className="text-slate-300">
              Present: {payload[0].payload.present} classes
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="edutrack-dashboard-view" className="space-y-6 animate-in fade-in duration-200">
      {/* Sleek Greeting Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Welcome back, {studentProfile.name.split(' ')[0]}!
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
            Here is what is happening with your studies today.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-sm font-medium text-slate-500 dark:text-slate-300 bg-white dark:bg-slate-900 px-4 py-2 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <span>Oct 24, 2026</span>
          </div>

          <button
            onClick={() => setActiveTab('profile')}
            className="hidden sm:flex items-center space-x-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 px-3.5 py-2 rounded-lg transition-colors border border-indigo-100 dark:border-indigo-900/40"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Student Profile</span>
          </button>
        </div>
      </div>

      {/* 4 Sleek Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          id="stat-cgpa"
          title="Current CGPA"
          value={studentProfile.cgpa.toFixed(2)}
          trend={{ value: '0.04', isPositive: true }}
          onClick={() => setActiveTab('results')}
        />

        <StatCard
          id="stat-attendance"
          title="Attendance"
          value={`${avgAttendance}%`}
          progress={avgAttendance}
          onClick={() => setActiveTab('attendance')}
        />

        <StatCard
          id="stat-credits"
          title="Credits Earned"
          value={totalCredits}
          subtitle="of 140 required"
          onClick={() => setActiveTab('courses')}
        />

        <StatCard
          id="stat-tasks"
          title="Due Tasks"
          value={pendingAssignments.length < 10 ? `0${pendingAssignments.length}` : pendingAssignments.length}
          trend={{ value: 'Urgent', isPositive: false }}
          onClick={() => setActiveTab('assignments')}
        />
      </div>

      {/* Sleek Layout: 2-Cols Upcoming Assignments & Attendance Chart + 1-Col Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Assignments Table Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 dark:text-white text-base">
                Upcoming Assignments
              </h3>
              <button
                onClick={() => setActiveTab('assignments')}
                className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:underline"
              >
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-400 text-xs uppercase font-bold tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Subject</th>
                    <th className="px-6 py-4">Deadline</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {assignments.slice(0, 4).map((asg) => {
                    const initials = getSubjectInitials(asg.courseCode);
                    const colorClass = getSubjectColor(asg.courseCode);
                    const isPending = asg.status === 'Pending';
                    const isSubmitted = asg.status === 'Completed';

                    return (
                      <tr key={asg.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${colorClass}`}>
                              {initials}
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 block">
                                {asg.title}
                              </span>
                              <span className="text-xs text-slate-400 font-mono">
                                {asg.courseCode}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                          {asg.dueDate}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 text-xs font-bold rounded-full ${
                              isSubmitted
                                ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                                : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                            }`}
                          >
                            {asg.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {isPending ? (
                            <button
                              onClick={() => setActiveTab('assignments')}
                              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
                            >
                              Submit
                            </button>
                          ) : (
                            <span className="text-xs font-medium text-slate-400 italic">
                              {asg.score ? `Score: ${asg.score}/${asg.totalPoints}` : 'Grading...'}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Attendance Trend Chart Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white text-base">
                  Semester Attendance Progression
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Compliance rate across active curriculum
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg">
                94.2% Overall
              </span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyAttendance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="attendanceSleekGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#f1f5f9'} />
                  <XAxis
                    dataKey="month"
                    stroke={isDarkMode ? '#94a3b8' : '#64748b'}
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[75, 100]}
                    stroke={isDarkMode ? '#94a3b8' : '#64748b'}
                    fontSize={12}
                    tickLine={false}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="rate"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#attendanceSleekGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Today's Schedule & Campus Notices */}
        <div className="space-y-6">
          {/* Today's Schedule Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 dark:text-white text-base">
                Today's Schedule
              </h3>
              <button
                onClick={() => setActiveTab('timetable')}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Timetable
              </button>
            </div>

            <div className="p-6 space-y-6">
              {todayClasses.length > 0 ? (
                todayClasses.map((cls, idx) => {
                  const isCurrent = idx === 0;

                  return (
                    <div
                      key={cls.id}
                      className={`relative pl-8 border-l-2 ${
                        isCurrent ? 'border-indigo-500' : 'border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <div
                        className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-white dark:border-slate-900 shadow-sm ${
                          isCurrent ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-600'
                        }`}
                      />
                      <div className={`space-y-1 ${!isCurrent ? 'opacity-85' : ''}`}>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-widest ${
                            isCurrent
                              ? 'text-indigo-500 dark:text-indigo-400'
                              : 'text-slate-400'
                          }`}
                        >
                          {cls.timeSlot}
                        </span>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                          {cls.courseName}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {cls.instructor} • {cls.room}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-6 text-xs text-slate-400">
                  No classes scheduled for today.
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                3 more classes scheduled tomorrow
              </p>
            </div>
          </div>

          {/* Quick Notice Board Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <BellRing className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-bold text-slate-800 dark:text-white text-sm">
                  Campus Circulars
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('notices')}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                View all
              </button>
            </div>

            <div className="space-y-3">
              {notices.slice(0, 3).map((notice) => (
                <div
                  key={notice.id}
                  onClick={() => setActiveTab('notices')}
                  className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                      {notice.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {notice.date}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                    {notice.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
