import React, { useState } from 'react';
import { useStudent } from '../../context/StudentContext';
import { Notice } from '../../types';
import {
  BellRing,
  Search,
  Calendar,
  User,
  Paperclip,
  Download,
  AlertCircle,
  Sparkles,
  Share2,
  ExternalLink,
  ChevronRight,
  X,
  FileText,
} from 'lucide-react';

export const NoticesPage: React.FC = () => {
  const { notices } = useStudent();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const categories = ['All', 'Academic', 'Exam', 'Event', 'Financial', 'Holiday', 'General'];

  const filteredNotices = notices.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.publishedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || n.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Exam':
        return 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300';
      case 'Academic':
        return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300';
      case 'Event':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300';
      case 'Financial':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300';
      case 'Holiday':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div id="edutrack-notices-view" className="space-y-6 animate-in fade-in duration-200">
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              Official University Notice Board
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              Live Feed
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Verified academic circulars, exam schedules, and administration bulletins
          </p>
        </div>

        <div className="relative min-w-[260px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search circulars by keyword or dept..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => {
          const count = cat === 'All' ? notices.length : notices.filter((n) => n.category === cat).length;
          const isSelected = categoryFilter === cat;

          return (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
              }`}
            >
              <span>{cat}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.map((notice) => {
          const catClass = getCategoryColor(notice.category);

          return (
            <div
              key={notice.id}
              onClick={() => setSelectedNotice(notice)}
              className={`rounded-2xl p-5 border bg-white dark:bg-slate-900 transition-all hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-sm cursor-pointer ${
                notice.isImportant
                  ? 'border-rose-200 dark:border-rose-900/60 bg-rose-50/20'
                  : 'border-slate-100 dark:border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${catClass}`}>
                      {notice.category}
                    </span>

                    {notice.isImportant && (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-rose-600" />
                        Urgent Circular
                      </span>
                    )}

                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {notice.date}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-800 dark:text-white leading-snug">
                    {notice.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {notice.content}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0 pt-2 sm:pt-0">
                  <span className="text-xs text-slate-400">
                    By: {notice.publishedBy}
                  </span>

                  <div className="flex items-center gap-2">
                    {notice.hasAttachment && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-lg">
                        <Paperclip className="w-3 h-3" />
                        PDF Attached
                      </span>
                    )}
                    <span className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:translate-x-1 transition-transform">
                      <ChevronRight className="w-5 h-5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[85vh] flex flex-col">
            <button
              onClick={() => setSelectedNotice(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${getCategoryColor(selectedNotice.category)}`}>
                {selectedNotice.category}
              </span>
              {selectedNotice.isImportant && (
                <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                  Urgent Notice
                </span>
              )}
              <span className="text-xs text-slate-400">Date: {selectedNotice.date}</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
              {selectedNotice.title}
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Issued by: {selectedNotice.publishedBy} • Office of the Registrar
            </p>

            <div className="my-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50 overflow-y-auto text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-3 flex-1">
              <p>{selectedNotice.content}</p>
              <p>
                All students are advised to adhere strictly to university guidelines and coordinate with their respective department coordinators if required.
              </p>
            </div>

            {selectedNotice.hasAttachment && (
              <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {selectedNotice.attachmentName || 'official_circular_bulletin.pdf'}
                    </p>
                    <p className="text-[11px] text-slate-500">Official Seal Verified • 1.2 MB</p>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Downloading attachment: ${selectedNotice.attachmentName}`)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
