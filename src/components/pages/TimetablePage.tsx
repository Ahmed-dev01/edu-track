import React, { useState } from 'react';
import { useStudent } from '../../context/StudentContext';
import { TimetableSlot } from '../../types';
import {
  Clock,
  MapPin,
  User,
  Calendar,
  Download,
  Printer,
  Sparkles,
  Grid,
  List,
  CheckCircle,
} from 'lucide-react';

export const TimetablePage: React.FC = () => {
  const { weeklyTimetable, courses } = useStudent();
  const days: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday')[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
  ];

  const [activeDayTab, setActiveDayTab] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'>('Monday');
  const [viewMode, setViewMode] = useState<'weekly' | 'daily'>('weekly');

  const timeSlots = [
    '09:00 AM - 10:30 AM',
    '10:45 AM - 12:15 PM',
    '11:00 AM - 12:30 PM',
    '01:30 PM - 03:00 PM',
    '02:00 PM - 03:30 PM',
    '02:00 PM - 04:00 PM',
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleExportICS = () => {
    alert('Weekly Class Schedule exported as EduTrack_Spring2026_Schedule.ics file!');
  };

  const getSlotColor = (color: string) => {
    switch (color) {
      case 'emerald':
        return 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-200';
      case 'blue':
        return 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/50 dark:border-blue-800 dark:text-blue-200';
      case 'purple':
        return 'bg-purple-50 border-purple-200 text-purple-900 dark:bg-purple-950/50 dark:border-purple-800 dark:text-purple-200';
      case 'amber':
        return 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/50 dark:border-amber-800 dark:text-amber-200';
      case 'rose':
        return 'bg-rose-50 border-rose-200 text-rose-900 dark:bg-rose-950/50 dark:border-rose-800 dark:text-rose-200';
      default:
        return 'bg-indigo-50 border-indigo-200 text-indigo-900 dark:bg-indigo-950/50 dark:border-indigo-800 dark:text-indigo-200';
    }
  };

  return (
    <div id="edutrack-timetable-view" className="space-y-6 animate-in fade-in duration-200">
      {/* Timetable Header & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              Weekly Academic Timetable
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              Spring 2026 Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Monday through Friday schedule • 19 Credit Hours load
          </p>
        </div>

        {/* View Mode & Actions */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Day selection on small screens */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setViewMode('weekly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'weekly'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Weekly Matrix</span>
            </button>
            <button
              onClick={() => setViewMode('daily')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'daily'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Day-by-Day</span>
            </button>
          </div>

          <button
            onClick={handleExportICS}
            className="p-2 rounded-lg border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-1.5 transition-all"
            title="Add to Google / Apple Calendar"
          >
            <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden sm:inline">Export .ICS</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2 rounded-lg border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-1.5 transition-all"
            title="Print Schedule"
          >
            <Printer className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span className="hidden sm:inline">Print</span>
          </button>
        </div>
      </div>

      {/* Day Tabs (especially useful on mobile or in Day-by-Day mode) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {days.map((day) => {
          const slotsCount = weeklyTimetable.filter((t) => t.day === day).length;
          const isSelected = activeDayTab === day;

          return (
            <button
              key={day}
              onClick={() => {
                setActiveDayTab(day);
                if (viewMode === 'weekly' && window.innerWidth < 768) {
                  setViewMode('daily');
                }
              }}
              className={`flex-1 min-w-[120px] p-3 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-200'
              }`}
            >
              <span className={`text-xs font-bold block ${isSelected ? 'text-white' : 'text-slate-800 dark:text-white'}`}>
                {day}
              </span>
              <span className={`text-[11px] mt-0.5 block ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                {slotsCount} Classes Scheduled
              </span>
            </button>
          );
        })}
      </div>

      {/* View 1: Day-by-Day Detailed Schedule View */}
      {viewMode === 'daily' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              {activeDayTab} Lectures & Labs
            </h3>
            <span className="text-xs text-slate-400">
              {weeklyTimetable.filter((t) => t.day === activeDayTab).length} sessions scheduled
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {weeklyTimetable
              .filter((t) => t.day === activeDayTab)
              .map((slot) => {
                const colorClass = getSlotColor(slot.color);

                return (
                  <div
                    key={slot.id}
                    className={`rounded-2xl p-5 border shadow-sm transition-all hover:shadow-md ${colorClass}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-white/70 dark:bg-black/30 shadow-xs">
                        {slot.courseCode}
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/80 dark:bg-black/40">
                        {slot.type}
                      </span>
                    </div>

                    <h4 className="text-base font-bold leading-snug">
                      {slot.courseName}
                    </h4>

                    <div className="mt-4 space-y-2 text-xs opacity-90">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 shrink-0" />
                        <span className="font-semibold">{slot.timeSlot}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 shrink-0" />
                        <span>Instructor: {slot.instructor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
                        <span className="font-bold">{slot.room}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        /* View 2: Weekly Full Matrix Grid View (Desktop & Tablet Optimized) */
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm p-4 overflow-x-auto">
          <div className="min-w-[760px] grid grid-cols-5 gap-3">
            {days.map((day) => {
              const daySlots = weeklyTimetable.filter((t) => t.day === day);

              return (
                <div key={day} className="space-y-3">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 text-center">
                    <p className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                      {day}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {daySlots.length} Classes
                    </p>
                  </div>

                  <div className="space-y-3 min-h-[320px]">
                    {daySlots.map((slot) => {
                      const colorClass = getSlotColor(slot.color);

                      return (
                        <div
                          key={slot.id}
                          className={`p-3 rounded-xl border text-xs shadow-xs transition-all hover:scale-[1.02] ${colorClass}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono font-bold text-[11px]">
                              {slot.courseCode}
                            </span>
                            <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 bg-white/60 dark:bg-black/30 rounded">
                              {slot.type}
                            </span>
                          </div>

                          <p className="font-bold text-xs line-clamp-2 leading-snug">
                            {slot.courseName}
                          </p>

                          <div className="mt-2.5 pt-2 border-t border-black/5 dark:border-white/5 space-y-1 text-[11px] opacity-85">
                            <div className="flex items-center gap-1 font-semibold">
                              <Clock className="w-3 h-3 shrink-0" />
                              <span>{slot.timeSlot}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 shrink-0" />
                              <span className="font-bold">{slot.room}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Timetable Legend & Notes */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-bold text-slate-700 dark:text-slate-300">Legend:</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500" /> Theory Lecture
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Practical Lab
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-500" /> Studio / Tutorial
          </span>
        </div>
        <span>Academic Year 2025–2026 Standard Schedule</span>
      </div>
    </div>
  );
};
