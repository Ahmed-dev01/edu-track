import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
    label?: string;
  };
  color?: 'indigo' | 'emerald' | 'blue' | 'purple' | 'amber' | 'rose';
  progress?: number;
  badge?: string;
  onClick?: () => void;
  id?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  progress,
  badge,
  onClick,
  id,
}) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-all duration-150 ${
        onClick ? 'cursor-pointer hover:border-indigo-200 dark:hover:border-slate-700 hover:shadow' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider mb-1">
          {title}
        </p>
        {Icon && (
          <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-end justify-between mt-2">
        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
          {value}
        </h3>

        {trend && (
          <span
            className={`text-xs font-bold px-2 py-1 rounded ${
              trend.isPositive
                ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/60'
                : 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60'
            }`}
          >
            {trend.isPositive ? '+' : ''}{trend.value}
          </span>
        )}

        {progress !== undefined && (
          <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-1.5">
            <div
              className="h-full bg-emerald-400 dark:bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        )}

        {badge && !trend && progress === undefined && (
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-1 rounded">
            {badge}
          </span>
        )}

        {subtitle && !trend && progress === undefined && !badge && (
          <span className="text-slate-400 text-xs font-medium truncate max-w-[120px]">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};
