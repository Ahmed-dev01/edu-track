import React, { useState } from 'react';
import { useStudent } from '../../context/StudentContext';
import { Logo } from '../common/Logo';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  Award,
  Users,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { motion } from 'motion/react';

export const LoginPage: React.FC = () => {
  const { login } = useStudent();
  const [email, setEmail] = useState('alex.morgan@university.edu');
  const [password, setPassword] = useState('studentPass2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email) {
      errs.email = 'University email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid academic email address';
    }
    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      login(email, password, rememberMe);
      setIsLoading(false);
    }, 600);
  };

  const handleQuickDemoLogin = () => {
    setEmail('alex.morgan@university.edu');
    setPassword('studentPass2026!');
    setErrors({});
    setIsLoading(true);
    setTimeout(() => {
      login('alex.morgan@university.edu', 'studentPass2026!', true);
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F1F5F9] dark:bg-slate-950 font-sans">
      {/* Left Column: University Visuals & Branding (Split Screen) */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-[#0F172A] text-white overflow-hidden border-r border-slate-800">
        {/* Background decorative subtle accent */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

        {/* Top Branding */}
        <div className="relative z-10">
          <Logo size="lg" variant="dark" showTagline />
        </div>

        {/* Center Content & Testimonial / Features */}
        <div className="relative z-10 my-auto py-12 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs font-semibold text-indigo-300 mb-6">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official University Student Portal — Spring 2026</span>
          </div>

          <h2 className="text-4xl font-bold tracking-tight leading-tight text-white">
            Empowering Your Academic Journey with Real-Time Insights.
          </h2>

          <p className="mt-4 text-slate-400 text-sm leading-relaxed">
            Access course curriculums, attendance analytics, semester results, timetables, and campus circulars within a unified high-performance digital environment.
          </p>

          {/* Quick Stats Grid */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300 w-fit mb-2">
                <BookOpen className="w-5 h-5" />
              </div>
              <p className="text-xl font-bold text-white">140+</p>
              <p className="text-xs text-slate-400">Undergrad Courses</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 w-fit mb-2">
                <Award className="w-5 h-5" />
              </div>
              <p className="text-xl font-bold text-white">98.4%</p>
              <p className="text-xs text-slate-400">Graduation Rate</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <div className="p-2 rounded-lg bg-sky-500/20 text-sky-300 w-fit mb-2">
                <Users className="w-5 h-5" />
              </div>
              <p className="text-xl font-bold text-white">18,500+</p>
              <p className="text-xs text-slate-400">Active Students</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-500 border-t border-slate-800 pt-6">
          <span>EduTrack SIS Platform v3.4.2</span>
          <span>Security Certified ISO 27001</span>
        </div>
      </div>

      {/* Right Column: Interactive Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 flex justify-center">
            <Logo size="lg" showTagline />
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
              Student Sign In
            </h2>
            <p className="mt-1.5 text-xs text-slate-400">
              Enter your university credentials to access your dashboard.
            </p>
          </div>

          {/* Quick Demo 1-Click Login Helper */}
          <div className="mb-6 p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 dark:bg-indigo-950/40 dark:border-indigo-900/50 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-indigo-900 dark:text-indigo-200">
                Demo Student Account
              </p>
              <p className="text-[11px] text-indigo-600 dark:text-indigo-400">
                Alex Morgan (CSE-3rd Year)
              </p>
            </div>
            <button
              type="button"
              id="demo-login-btn"
              onClick={handleQuickDemoLogin}
              className="px-3 py-1.5 text-xs font-bold text-indigo-600 bg-white dark:bg-indigo-900 dark:text-white rounded-lg shadow-sm hover:shadow hover:bg-indigo-50 dark:hover:bg-indigo-800 transition-all"
            >
              1-Click Sign In
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email Input */}
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5"
              >
                University Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="student.name@university.edu"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white transition-all focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500'
                      : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500/20 focus:border-indigo-600'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="login-password"
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Password
                </label>
                <button
                  type="button"
                  id="forgot-password-link"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  placeholder="••••••••••••"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-xs bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white transition-all focus:outline-none focus:ring-2 ${
                    errors.password
                      ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500'
                      : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500/20 focus:border-indigo-600'
                  }`}
                />
                <button
                  type="button"
                  id="toggle-password-visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Remember my session on this device
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="login-submit-btn"
              disabled={isLoading}
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Help & Support Footer */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-[11px] text-slate-400">
              Need assistance with your institutional SSO or token?{' '}
              <a href="#help" onClick={(e) => { e.preventDefault(); alert('Campus IT Helpdesk: it.support@university.edu | (555) 019-2831'); }} className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
                Contact Campus IT Desk
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              Reset Academic Account Password
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Enter your registered university email to receive a password reset link and temporary security code.
            </p>

            {forgotSent ? (
              <div className="my-6 p-4 rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 text-xs leading-relaxed flex items-start gap-3 border border-emerald-100 dark:border-emerald-900/40">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                <div>
                  <p className="font-bold">Reset Instructions Dispatched</p>
                  <p className="mt-1">
                    A recovery link has been sent to <strong>{forgotEmail || email}</strong>. Please check your inbox and spam folder.
                  </p>
                </div>
              </div>
            ) : (
              <div className="my-4">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  University Email
                </label>
                <input
                  type="email"
                  value={forgotEmail || email}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => {
                  setShowForgotModal(false);
                  setForgotSent(false);
                }}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 rounded-xl"
              >
                Close
              </button>
              {!forgotSent && (
                <button
                  type="button"
                  onClick={() => setForgotSent(true)}
                  className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm"
                >
                  Send Reset Link
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
