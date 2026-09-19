import React, { useState } from 'react';
import { useStudent } from '../../context/StudentContext';
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  GraduationCap,
  Award,
  BookOpen,
  Edit3,
  Shield,
  CreditCard,
  QrCode,
  Download,
  CheckCircle2,
  X,
  Sparkles,
  Building,
  HeartHandshake,
} from 'lucide-react';
import { Logo } from '../common/Logo';

export const ProfilePage: React.FC = () => {
  const { studentProfile, updateProfile, isDarkMode } = useStudent();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isIdCardOpen, setIsIdCardOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: studentProfile.name,
    email: studentProfile.email,
    phone: studentProfile.phone,
    address: studentProfile.address,
    dateOfBirth: studentProfile.dateOfBirth,
    bloodGroup: studentProfile.bloodGroup,
    guardianName: studentProfile.guardianName,
    guardianPhone: studentProfile.guardianPhone,
    emergencyContact: studentProfile.emergencyContact,
    residentialHall: studentProfile.residentialHall,
    avatar: studentProfile.avatar,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditModalOpen(false);
  };

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
  ];

  return (
    <div id="edutrack-profile-view" className="space-y-6 animate-in fade-in duration-200">
      {/* Profile Header Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative group">
              <img
                src={studentProfile.avatar}
                alt={studentProfile.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-indigo-500/10 shadow-sm"
              />
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="absolute inset-0 bg-slate-950/40 rounded-2xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                title="Change Photo"
              >
                <Edit3 className="w-5 h-5" />
              </button>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">
                  {studentProfile.name}
                </h2>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                  {studentProfile.status}
                </span>
                {studentProfile.deansList && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    Dean's List
                  </span>
                )}
              </div>

              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                {studentProfile.degree}
              </p>

              <p className="text-xs text-slate-400">
                {studentProfile.department} • {studentProfile.semester}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
                <span className="bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded">
                  ID: {studentProfile.studentId}
                </span>
                <span>Enrolled: {studentProfile.enrollmentDate}</span>
                <span>Expected: {studentProfile.expectedGraduation}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsIdCardOpen(true)}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              <CreditCard className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Digital ID Card</span>
            </button>

            <button
              id="edit-profile-btn"
              onClick={() => setIsEditModalOpen(true)}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Personal & Contact Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Personal & Contact Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Student Full Name</span>
                <span className="font-semibold text-slate-900 dark:text-white">{studentProfile.name}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Student Identification Number</span>
                <span className="font-semibold font-mono text-indigo-600 dark:text-indigo-400">{studentProfile.studentId}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">University Email</span>
                <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-slate-400" />
                  {studentProfile.email}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Phone Number</span>
                <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-slate-400" />
                  {studentProfile.phone}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Date of Birth</span>
                <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {studentProfile.dateOfBirth}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Blood Group & Gender</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {studentProfile.bloodGroup} • {studentProfile.gender}
                </span>
              </div>

              <div className="sm:col-span-2 p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Permanent Residential Address</span>
                <span className="font-semibold text-slate-900 dark:text-white flex items-start gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  {studentProfile.address}
                </span>
              </div>

              <div className="sm:col-span-2 p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Campus Residence / Hall</span>
                <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-slate-400" />
                  {studentProfile.residentialHall}
                </span>
              </div>
            </div>
          </div>

          {/* Emergency & Guardian Information */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Guardian & Emergency Contacts</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Guardian Names</span>
                <span className="font-semibold text-slate-900 dark:text-white">{studentProfile.guardianName}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Guardian Contact Phone</span>
                <span className="font-semibold text-slate-900 dark:text-white">{studentProfile.guardianPhone}</span>
              </div>

              <div className="sm:col-span-2 p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Designated Emergency Contact</span>
                <span className="font-semibold text-slate-900 dark:text-white">{studentProfile.emergencyContact}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Academic Status & Faculty Advisor */}
        <div className="space-y-6">
          {/* Academic Overview Card */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Academic Progress</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40">
                <p className="text-slate-500 dark:text-slate-400">Total Credits Earned</p>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-xl font-bold text-indigo-900 dark:text-indigo-200">
                    {studentProfile.completedCredits} / {studentProfile.totalCredits}
                  </span>
                  <span className="font-bold text-indigo-600">
                    {Math.round((studentProfile.completedCredits / studentProfile.totalCredits) * 100)}%
                  </span>
                </div>
                <div className="h-2 w-full bg-indigo-200/60 dark:bg-indigo-900 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${(studentProfile.completedCredits / studentProfile.totalCredits) * 100}%` }}
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Current CGPA</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono text-sm">
                  {studentProfile.cgpa.toFixed(2)} / 4.00
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Academic Standing</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Good Standing</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Honors & Recognition</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">Dean’s Honor Roll</span>
              </div>
            </div>
          </div>

          {/* Faculty Advisor Card */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80 dark:bg-slate-900 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>Academic Advisor</span>
            </h3>

            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold flex items-center justify-center text-sm shrink-0">
                EM
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {studentProfile.advisorName}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Senior Professor, Department of Computer Science
                </p>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 flex items-center gap-1 pt-1">
                  <Mail className="w-3 h-3" />
                  {studentProfile.advisorEmail}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 my-8">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
              Edit Student Profile
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Update your contact information and emergency details.
            </p>

            <form onSubmit={handleSave} className="mt-6 space-y-4">
              {/* Avatar Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Select Profile Avatar
                </label>
                <div className="flex items-center gap-3">
                  {sampleAvatars.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`Option ${i + 1}`}
                      onClick={() => setFormData({ ...formData, avatar: url })}
                      className={`w-12 h-12 rounded-xl object-cover cursor-pointer transition-transform ${
                        formData.avatar === url ? 'ring-4 ring-indigo-600 scale-105' : 'opacity-70 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Blood Group
                  </label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Residential Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Guardian Name
                  </label>
                  <input
                    type="text"
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Guardian Phone
                  </label>
                  <input
                    type="text"
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Digital Student ID Card Modal */}
      {isIdCardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white p-6 border border-white/20 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsIdCardOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {/* University Card Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <Logo size="sm" variant="dark" />
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-indigo-500/30 rounded-md text-sky-300 border border-sky-400/30">
                Student ID
              </span>
            </div>

            {/* Card Body */}
            <div className="my-6 flex items-center gap-4">
              <img
                src={studentProfile.avatar}
                alt={studentProfile.name}
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-sky-400/50 shadow-md"
              />
              <div className="space-y-0.5">
                <h4 className="text-base font-extrabold text-white">
                  {studentProfile.name}
                </h4>
                <p className="text-xs font-mono text-sky-300">
                  {studentProfile.studentId}
                </p>
                <p className="text-[11px] text-slate-300">
                  Computer Science Dept
                </p>
                <p className="text-[10px] text-emerald-400 font-semibold">
                  Valid Thru: May 2027
                </p>
              </div>
            </div>

            {/* Digital Barcode / QR Simulation */}
            <div className="p-3 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">
                  Access NFC & Barcode
                </p>
                <p className="text-xs font-mono font-bold text-sky-200">
                  *2023-8842-CS-SIS*
                </p>
              </div>
              <QrCode className="w-8 h-8 text-sky-300" />
            </div>

            <div className="mt-6 flex items-center gap-2">
              <button
                onClick={() => {
                  alert('Digital ID Card image exported to downloads folder!');
                  setIsIdCardOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-md flex items-center justify-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save ID Card</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
