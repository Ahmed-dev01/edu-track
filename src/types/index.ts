export type NavItem = 
  | 'dashboard'
  | 'profile'
  | 'courses'
  | 'attendance'
  | 'results'
  | 'timetable'
  | 'assignments'
  | 'notices'
  | 'settings';

export interface StudentProfile {
  id: string;
  studentId: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  department: string;
  degree: string;
  semester: string;
  currentSemesterNumber: number;
  cgpa: number;
  totalCredits: number;
  completedCredits: number;
  dateOfBirth: string;
  bloodGroup: string;
  gender: string;
  address: string;
  guardianName: string;
  guardianPhone: string;
  emergencyContact: string;
  enrollmentDate: string;
  expectedGraduation: string;
  advisorName: string;
  advisorEmail: string;
  residentialHall: string;
  status: 'Active' | 'On Leave' | 'Graduated';
  deansList: boolean;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  instructor: {
    name: string;
    email: string;
    avatar: string;
    office: string;
  };
  credits: number;
  schedule: string;
  days: string[];
  time: string;
  room: string;
  progress: number;
  attendancePercentage: number;
  category: 'Core' | 'Elective' | 'Lab' | 'General';
  color: string;
  description: string;
  syllabus: { week: number; topic: string; completed: boolean }[];
}

export interface AttendanceRecord {
  id: string;
  courseCode: string;
  courseName: string;
  date: string;
  time: string;
  status: 'Present' | 'Absent' | 'Late';
  room: string;
  remarks?: string;
}

export interface CourseAttendanceSummary {
  courseCode: string;
  courseName: string;
  totalClasses: number;
  present: number;
  absent: number;
  late: number;
  percentage: number;
  credits: number;
  status: 'Safe' | 'Warning' | 'Critical';
}

export interface MonthlyAttendance {
  month: string;
  present: number;
  absent: number;
  late: number;
  rate: number;
}

export interface CourseResult {
  id: string;
  courseCode: string;
  courseName: string;
  credits: number;
  grade: string;
  gpa: number;
  totalMarks: number;
  obtainedMarks: number;
  breakdown: {
    quizzes: number;
    midterm: number;
    assignments: number;
    lab?: number;
    finalExam: number;
  };
  semester: string;
  status: 'Passed' | 'Failed' | 'In Progress';
}

export interface SemesterResult {
  semesterNumber: number;
  semesterName: string;
  academicYear: string;
  gpa: number;
  cgpa: number;
  creditsEnrolled: number;
  creditsEarned: number;
  courses: CourseResult[];
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  startTime: string;
  endTime: string;
  timeSlot: string; // e.g. "09:00 AM - 10:30 AM"
  courseCode: string;
  courseName: string;
  instructor: string;
  room: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
  color: string;
}

export interface Assignment {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  description: string;
  dueDate: string;
  dueTime: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Completed' | 'Overdue';
  totalPoints: number;
  score?: number;
  submittedDate?: string;
  submittedFile?: string;
  obtainedGrade?: string;
  feedback?: string;
}

export interface UniversityNotice {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  category: any;
  isImportant: boolean;
  publishedBy: string;
  hasAttachment?: boolean;
  attachmentName?: string;
  attachmentSize?: string;
}

export type Notice = UniversityNotice;

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'assignment' | 'grade' | 'attendance' | 'notice' | 'system';
  linkTo?: NavItem;
}

export interface UserSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  smsAlerts?: boolean;
  attendanceAlerts: boolean;
  gradeAlerts: boolean;
  examAlerts?: boolean;
  assignmentReminders: boolean;
  newsletterSubscription: boolean;
  theme: 'light' | 'dark' | 'system';
  twoFactorEnabled: boolean;
  twoFactorAuth?: boolean;
  compactView: boolean;
  language?: string;
}
