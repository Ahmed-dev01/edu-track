import React, { useState } from 'react';
import { useStudent } from '../../context/StudentContext';
import {
  Award,
  TrendingUp,
  Download,
  Calculator,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  FileSpreadsheet,
  Layers,
  HelpCircle,
  X,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
} from 'recharts';

export const ResultsPage: React.FC = () => {
  const { studentProfile, academicHistory, isDarkMode } = useStudent();
  const [selectedSemesterIndex, setSelectedSemesterIndex] = useState(0);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // Target Calculator State
  const [targetCGPA, setTargetCGPA] = useState('3.90');
  const [remainingCredits, setRemainingCredits] = useState('36');
  const [requiredGPA, setRequiredGPA] = useState<number | null>(null);

  const currentSemester = academicHistory[selectedSemesterIndex] || academicHistory[0];

  // Chart data for semester GPA trend
  const trendData = [...academicHistory]
    .reverse()
    .map((sem) => ({
      name: `Sem ${sem.semesterNumber}`,
      gpa: sem.gpa,
      cgpa: sem.cgpa,
      credits: sem.creditsEarned,
    }));

  const handleCalculateCGPA = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseFloat(targetCGPA);
    const remCreds = parseFloat(remainingCredits);
    const currCGPA = studentProfile.cgpa;
    const completedCreds = studentProfile.completedCredits;

    if (isNaN(target) || isNaN(remCreds) || remCreds <= 0) return;

    // target = (currCGPA * completedCreds + reqGPA * remCreds) / (completedCreds + remCreds)
    // reqGPA = (target * (completedCreds + remCreds) - currCGPA * completedCreds) / remCreds
    const totalCredits = completedCreds + remCreds;
    const req = (target * totalCredits - currCGPA * completedCreds) / remCreds;
    setRequiredGPA(Math.round(req * 100) / 100);
  };

  const handleExportReport = () => {
    alert(`Official Grade Report for ${studentProfile.name} (${studentProfile.studentId}) — ${currentSemester.semesterName} generated!`);
  };

  return (
    <div id="edutrack-results-view" className="space-y-6 animate-in fade-in duration-200">
      {/* Top Academic Highlights Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Cumulative CGPA */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">
              Cumulative CGPA
            </span>
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
              {studentProfile.cgpa.toFixed(2)}
            </h3>
            <span className="text-green-500 text-xs font-bold bg-green-50 dark:bg-green-950/60 px-2 py-1 rounded">
              Top 5%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            Scale: 4.00 Max • Dean's List Honoree
          </p>
        </div>

        {/* Selected Semester GPA */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">
              {currentSemester.semesterName} GPA
            </span>
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
              {currentSemester.gpa.toFixed(2)}
            </h3>
            <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 px-2 py-1 rounded">
              Grade A
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            {currentSemester.creditsEarned} Credits Enrolled
          </p>
        </div>

        {/* Total Credits Completed */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">
              Credits Completed
            </span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <BookOpen className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
              {studentProfile.completedCredits}
            </h3>
            <span className="text-slate-400 text-xs font-medium">of {studentProfile.totalCredits}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            72.7% Degree Requirements Met
          </p>
        </div>

        {/* Action / Tools Card */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider block">
              Graduation Forecast
            </span>
            <p className="text-sm font-bold text-slate-800 dark:text-white mt-1">
              First Class Honors
            </p>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="flex-1 py-1.5 px-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>CGPA Planner</span>
            </button>
            <button
              onClick={handleExportReport}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              title="Download Grade Report"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Visual Performance Progression Chart */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              Semester GPA & Cumulative CGPA Progression
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Academic performance trajectory from Semester 1 through Semester 6
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
              Semester GPA
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              Cumulative CGPA
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#f1f5f9'} />
              <XAxis dataKey="name" stroke={isDarkMode ? '#94a3b8' : '#64748b'} fontSize={12} tickLine={false} />
              <YAxis domain={[3.0, 4.0]} stroke={isDarkMode ? '#94a3b8' : '#64748b'} fontSize={12} tickLine={false} tickFormatter={(v) => v.toFixed(1)} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Line type="monotone" dataKey="gpa" name="Semester GPA" stroke="#4f46e5" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="cgpa" name="Cumulative CGPA" stroke="#10b981" strokeWidth={2.5} strokeDasharray="4 4" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Semester Selector Tabs & Results Sheet Table */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              Official Grade Sheet — {currentSemester.semesterName}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {currentSemester.academicYear} • Term GPA: {currentSemester.gpa.toFixed(2)}
            </p>
          </div>

          {/* Term Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {academicHistory.map((sem, idx) => (
              <button
                key={sem.semesterNumber}
                onClick={() => setSelectedSemesterIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  selectedSemesterIndex === idx
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Sem {sem.semesterNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Grade Breakdown Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-400 uppercase font-bold tracking-widest border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">Course Code & Title</th>
                <th className="px-4 py-3">Credits</th>
                <th className="px-4 py-3">Score Breakdown (Quiz/Mid/Asg/Final)</th>
                <th className="px-4 py-3">Obtained Marks</th>
                <th className="px-4 py-3">Letter Grade</th>
                <th className="px-4 py-3">Grade Point</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {currentSemester.courses.map((c) => {
                const isTopGrade = c.grade === 'A+' || c.grade === 'A';

                return (
                  <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                          {c.courseCode}
                        </span>
                        <span className="font-bold text-slate-800 dark:text-white">{c.courseName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-slate-700 dark:text-slate-300">
                      {c.credits}.0
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 font-mono text-[11px]">
                      Q:{c.breakdown.quizzes} | M:{c.breakdown.midterm} | A:{c.breakdown.assignments} | F:{c.breakdown.finalExam}
                    </td>
                    <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                      {c.obtainedMarks} / {c.totalMarks}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`font-bold px-2 py-0.5 rounded-md text-xs ${
                          isTopGrade
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                        }`}
                      >
                        {c.grade}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-mono font-bold text-slate-900 dark:text-white">
                      {c.gpa.toFixed(2)}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1 font-semibold text-[11px] text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {c.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Semester Summary Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <span>Official Grade Report generated by Office of Controller of Exams</span>
          <button
            onClick={handleExportReport}
            className="flex items-center gap-1.5 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <Download className="w-4 h-4" />
            <span>Download Certified Transcript (.PDF)</span>
          </button>
        </div>
      </div>

      {/* CGPA Target Calculator Simulator Modal */}
      {isCalculatorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setIsCalculatorOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              CGPA Target Simulator
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Calculate the required average GPA needed across remaining semesters to achieve your target graduation CGPA.
            </p>

            <form onSubmit={handleCalculateCGPA} className="mt-4 space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs flex justify-between">
                <span className="text-slate-500">Current CGPA (96 Credits):</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">3.84 / 4.00</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target Graduation CGPA
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="3.0"
                  max="4.0"
                  value={targetCGPA}
                  onChange={(e) => setTargetCGPA(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Remaining Credit Hours
                </label>
                <input
                  type="number"
                  min="1"
                  max="40"
                  value={remainingCredits}
                  onChange={(e) => setRemainingCredits(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow mt-2"
              >
                Compute Required GPA
              </button>
            </form>

            {requiredGPA !== null && (
              <div className="mt-4 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-center animate-in fade-in">
                <span className="text-xs text-indigo-800 dark:text-indigo-300 block">
                  Required Average GPA in Remaining Terms:
                </span>
                <span className={`text-2xl font-extrabold font-mono mt-1 block ${requiredGPA > 4.0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {requiredGPA.toFixed(2)} {requiredGPA > 4.0 ? '(Exceeds Max 4.00)' : 'GPA'}
                </span>
                <p className="text-[11px] text-slate-500 mt-1">
                  {requiredGPA <= 4.0
                    ? '✓ Highly achievable with consistent A/A- letter grades!'
                    : 'Target exceeds maximum possible GPA score mathematically.'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
