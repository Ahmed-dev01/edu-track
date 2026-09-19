import React, { useState } from 'react';
import { useStudent } from '../../context/StudentContext';
import { Course } from '../../types';
import {
  BookOpen,
  Search,
  Grid,
  List,
  Clock,
  MapPin,
  Mail,
  CheckCircle2,
  Circle,
  FileText,
  Sparkles,
  ExternalLink,
  X,
  User,
  GraduationCap,
} from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const { courses } = useStudent();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Core' | 'Elective' | 'General'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalCredits = courses.reduce((acc, c) => acc + c.credits, 0);

  return (
    <div id="edutrack-courses-view" className="space-y-6 animate-in fade-in duration-200">
      {/* Header Controls & Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Current Semester Courses
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Spring 2026 • {courses.length} Enrolled Courses • {totalCredits} Total Credits
          </p>
        </div>

        {/* Filters & View Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search bar */}
          <div className="relative min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses or faculty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-medium">
            {(['All', 'Core', 'Elective', 'General'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  categoryFilter === cat
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-bold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-400'}`}
              title="Grid View"
              aria-label="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg ${viewMode === 'table' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-400'}`}
              title="Table View"
              aria-label="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:border-indigo-200 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700 hover:shadow transition-all duration-150"
            >
              <div>
                {/* Course Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                    {course.code}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {course.credits} Credits
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {course.name}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                {/* Instructor Card */}
                <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 flex items-center gap-3">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 dark:text-white truncate">
                      {course.instructor.name}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {course.instructor.office}
                    </p>
                  </div>
                </div>

                {/* Schedule & Location */}
                <div className="mt-4 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span>{course.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span>{course.room}</span>
                  </div>
                </div>
              </div>

              {/* Progress & Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                  <span>Syllabus Progress</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{course.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="flex-1 py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/80 dark:text-indigo-300 text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Syllabus</span>
                  </button>

                  <a
                    href={`mailto:${course.instructor.email}`}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    title={`Email ${course.instructor.name}`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="overflow-x-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-400 uppercase font-bold tracking-widest border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4">Course Code & Name</th>
                <th className="px-6 py-4">Instructor</th>
                <th className="px-6 py-4">Credits</th>
                <th className="px-6 py-4">Schedule & Room</th>
                <th className="px-6 py-4">Progress</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold px-2 py-1 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 rounded-lg">
                        {course.code}
                      </span>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white">{course.name}</p>
                        <span className="text-[11px] text-slate-400">{course.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <img src={course.instructor.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                      <span>{course.instructor.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">
                    {course.credits}.0 Hrs
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    <p className="font-medium">{course.schedule}</p>
                    <p className="text-[11px] text-indigo-600 dark:text-indigo-400">{course.room}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-24">
                      <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
                        <span>{course.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${course.progress}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-400 font-bold transition-colors"
                    >
                      Syllabus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Syllabus Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[85vh] flex flex-col">
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold px-2 py-0.5 bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 rounded">
                {selectedCourse.code}
              </span>
              <span className="text-xs text-slate-500 font-medium">{selectedCourse.credits} Credits</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
              {selectedCourse.name} — Syllabus
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              {selectedCourse.description}
            </p>

            {/* Weekly Syllabus Breakdown */}
            <div className="my-6 overflow-y-auto pr-2 space-y-2.5 flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Weekly Curriculum Roadmap
              </p>

              {selectedCourse.syllabus.map((item) => (
                <div
                  key={item.week}
                  className={`p-3 rounded-xl border flex items-center gap-3 transition-colors ${
                    item.completed
                      ? 'bg-emerald-50/50 border-emerald-200/80 dark:bg-emerald-950/20 dark:border-emerald-900/50'
                      : 'bg-slate-50 border-slate-200 dark:bg-slate-800/40 dark:border-slate-700/50'
                  }`}
                >
                  {item.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400 shrink-0" />
                  )}

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Week {item.week}
                    </span>
                    <span className={`text-xs font-semibold ${item.completed ? 'text-slate-800 dark:text-slate-200 line-through opacity-80' : 'text-slate-900 dark:text-white'}`}>
                      {item.topic}
                    </span>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.completed ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}`}>
                    {item.completed ? 'Completed' : 'Upcoming'}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">Instructor: {selectedCourse.instructor.name}</span>
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow"
              >
                Close Syllabus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
