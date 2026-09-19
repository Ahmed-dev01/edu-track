import React from 'react';
import { useStudent } from '../../context/StudentContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStudent();

  return (
    <div
      id="edutrack-toast-container"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      <AnimatePresence>
        {toasts.map((toast) => {
          const getIcon = () => {
            switch (toast.type) {
              case 'success':
                return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
              case 'error':
                return <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />;
              case 'warning':
                return <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
              default:
                return <Info className="w-5 h-5 text-indigo-500 shrink-0" />;
            }
          };

          const getBorder = () => {
            switch (toast.type) {
              case 'success':
                return 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/95 dark:bg-slate-900/95';
              case 'error':
                return 'border-rose-200 dark:border-rose-900/50 bg-rose-50/95 dark:bg-slate-900/95';
              case 'warning':
                return 'border-amber-200 dark:border-amber-900/50 bg-amber-50/95 dark:bg-slate-900/95';
              default:
                return 'border-indigo-200 dark:border-indigo-900/50 bg-slate-50/95 dark:bg-slate-900/95';
            }
          };

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto rounded-xl border p-4 shadow-lg backdrop-blur-md ${getBorder()} flex items-start gap-3`}
            >
              {getIcon()}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {toast.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 transition-colors"
                aria-label="Dismiss toast"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
