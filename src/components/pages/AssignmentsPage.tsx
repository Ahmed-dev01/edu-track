import React, { useState } from 'react';
import { useStudent } from '../../context/StudentContext';
import { Assignment } from '../../types';
import {
  FileCheck2,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  UploadCloud,
  FileText,
  Search,
  Filter,
  X,
  Sparkles,
  Paperclip,
  Check,
  AlertTriangle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AssignmentsPage: React.FC = () => {
  const { assignments, submitAssignment, courses } = useStudent();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Completed' | 'Overdue'>('All');
  const [priorityFilter, setPriorityFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  const [selectedForSubmit, setSelectedForSubmit] = useState<Assignment | null>(null);
  const [selectedDetails, setSelectedDetails] = useState<Assignment | null>(null);

  // Submit Modal State
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [dummyFileName, setDummyFileName] = useState('');
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredAssignments = assignments.filter((asg) => {
    const matchesSearch =
      asg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asg.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asg.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || asg.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || asg.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const pendingCount = assignments.filter((a) => a.status === 'Pending').length;
  const completedCount = assignments.filter((a) => a.status === 'Completed').length;
  const overdueCount = assignments.filter((a) => a.status === 'Overdue').length;

  const handleOpenSubmit = (asg: Assignment) => {
    setSelectedForSubmit(asg);
    setDummyFileName(`${asg.courseCode.toLowerCase()}_alex_submission.zip`);
    setUploadFile(null);
    setSubmissionNotes('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
      setDummyFileName(e.target.files[0].name);
    }
  };

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedForSubmit) return;

    setIsSubmitting(true);
    setTimeout(() => {
      submitAssignment(selectedForSubmit.id, dummyFileName || 'assignment_submission.zip', submissionNotes);
      setIsSubmitting(false);
      setSelectedForSubmit(null);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 500);
  };

  return (
    <div id="edutrack-assignments-view" className="space-y-6 animate-in fade-in duration-200">
      {/* Header Stat Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div
          onClick={() => setStatusFilter('Pending')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === 'Pending'
              ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/20'
              : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Pending Submissions
            </span>
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
              {pendingCount}
            </h3>
            <span className="text-amber-500 text-xs font-bold bg-amber-50 dark:bg-amber-950/60 px-2 py-1 rounded">Action Needed</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">Requires student upload before deadline</p>
        </div>

        <div
          onClick={() => setStatusFilter('Completed')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === 'Completed'
              ? 'bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-500/20'
              : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Completed & Evaluated
            </span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
              {completedCount}
            </h3>
            <span className="text-green-500 text-xs font-bold bg-green-50 dark:bg-green-950/60 px-2 py-1 rounded">Graded</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">Evaluated by course faculty</p>
        </div>

        <div
          onClick={() => setStatusFilter('Overdue')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === 'Overdue'
              ? 'bg-rose-500/10 border-rose-500 ring-2 ring-rose-500/20'
              : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
              Overdue Tasks
            </span>
            <span className="p-1.5 rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
              <AlertCircle className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
              {overdueCount}
            </h3>
            <span className="text-rose-500 text-xs font-bold bg-rose-50 dark:bg-rose-950/60 px-2 py-1 rounded">Penalty</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">Late submission penalties apply</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search assignments by title or course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Status Tabs */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
            {(['All', 'Pending', 'Completed', 'Overdue'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  statusFilter === st
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Priority Select */}
          <select
            value={priorityFilter}
            onChange={(e: any) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Assignments Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssignments.map((asg) => {
          const isPending = asg.status === 'Pending';
          const isCompleted = asg.status === 'Completed';
          const isOverdue = asg.status === 'Overdue';

          const priorityBadge = {
            High: 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400',
            Medium: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400',
            Low: 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400',
          }[asg.priority];

          return (
            <div
              key={asg.id}
              className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:border-indigo-200 dark:bg-slate-900 dark:border-slate-800 transition-all duration-200"
            >
              <div>
                {/* Badges & Course */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                    {asg.courseCode}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${priorityBadge}`}>
                      {asg.priority}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isCompleted
                          ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                          : isOverdue
                          ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
                          : 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400'
                      }`}
                    >
                      {asg.status}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-800 dark:text-white leading-snug">
                  {asg.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {asg.description}
                </p>

                {/* Due Date & Weightage */}
                <div className="mt-4 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      Due Date:
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {asg.dueDate} ({asg.dueTime})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Total Marks:</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      {asg.totalPoints} Points
                    </span>
                  </div>
                </div>

                {isCompleted && asg.obtainedGrade && (
                  <div className="mt-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 text-xs">
                    <div className="flex items-center justify-between font-bold text-emerald-800 dark:text-emerald-300">
                      <span>Evaluated Score:</span>
                      <span>{asg.obtainedGrade}</span>
                    </div>
                    {asg.feedback && (
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 italic">
                        "{asg.feedback}"
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                {isCompleted ? (
                  <button
                    onClick={() => setSelectedDetails(asg)}
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Submission Details</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleOpenSubmit(asg)}
                    className={`w-full py-2.5 rounded-xl text-white text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isOverdue
                        ? 'bg-rose-600 hover:bg-rose-700'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>{isOverdue ? 'Submit Late Assignment' : 'Submit Assignment'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Assignment Modal */}
      {selectedForSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setSelectedForSubmit(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold px-2 py-0.5 bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 rounded">
                {selectedForSubmit.courseCode}
              </span>
              <span className="text-xs text-slate-400">Due: {selectedForSubmit.dueDate}</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              Submit: {selectedForSubmit.title}
            </h3>

            <form onSubmit={handleConfirmSubmit} className="mt-5 space-y-4">
              {/* Drag & Drop Upload Zone */}
              <div className="relative border-2 border-dashed border-indigo-200 dark:border-indigo-900/60 hover:border-indigo-500 rounded-2xl p-6 text-center bg-indigo-50/40 dark:bg-indigo-950/20 transition-all cursor-pointer">
                <input
                  type="file"
                  id="assignment-file-input"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <UploadCloud className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {dummyFileName ? dummyFileName : 'Drag & drop project archive (.zip, .pdf, .docx)'}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Maximum file size: 50MB. All standard academic formats accepted.
                </p>
              </div>

              {/* Submission Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Student Comments / GitHub Link (Optional)
                </label>
                <textarea
                  rows={3}
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  placeholder="Add repository URL, deployment link, or notes for the faculty grader..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedForSubmit(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-1.5"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Confirm & Upload File</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Submitted Details Modal */}
      {selectedDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setSelectedDetails(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              Submission Details & Grader Review
            </h3>

            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-slate-400 block">Assignment:</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedDetails.title}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-slate-400 block">Uploaded File:</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 mt-0.5">
                  <Paperclip className="w-3.5 h-3.5" />
                  {selectedDetails.submittedFile}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Submitted on: {selectedDetails.submittedDate}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/50">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block">
                  Grade: {selectedDetails.obtainedGrade}
                </span>
                <p className="mt-1 text-slate-600 dark:text-slate-300 italic">
                  "{selectedDetails.feedback}"
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-right">
              <button
                onClick={() => setSelectedDetails(null)}
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
