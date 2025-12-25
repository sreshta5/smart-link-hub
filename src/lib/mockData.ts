import { SavedLink, Notification } from '@/types/link';

const now = new Date();

export const mockLinks: SavedLink[] = [
  {
    id: '1',
    title: 'Final Semester Exam Registration',
    url: 'https://university.edu/exam-registration',
    category: 'exams',
    deadline: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    reminderTime: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
    notes: 'Don\'t forget to bring student ID',
    status: 'not_applied',
    createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    title: 'Google Summer Internship 2024',
    url: 'https://careers.google.com/students',
    category: 'internships',
    deadline: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    reminderTime: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
    notes: 'Prepare resume and cover letter',
    status: 'not_applied',
    createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    title: 'Merit Scholarship Application',
    url: 'https://university.edu/scholarships/merit',
    category: 'scholarships',
    deadline: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    reminderTime: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000),
    notes: 'Need transcript and recommendation letters',
    status: 'applied',
    createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    title: 'Tech Career Fair 2024',
    url: 'https://university.edu/events/career-fair',
    category: 'events',
    deadline: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    reminderTime: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000),
    notes: 'Dress code: Business casual',
    status: 'not_applied',
    createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
  },
  {
    id: '5',
    title: 'Graduate School Application - MIT',
    url: 'https://gradadmissions.mit.edu/apply',
    category: 'applications',
    deadline: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago (expired)
    reminderTime: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
    notes: 'GRE scores required',
    status: 'expired',
    createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: '6',
    title: 'Hackathon Registration',
    url: 'https://hackathon.dev/register',
    category: 'events',
    deadline: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
    reminderTime: new Date(now.getTime() + 12 * 60 * 60 * 1000),
    notes: 'Team size: 2-4 members',
    status: 'applied',
    createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    linkId: '1',
    title: 'Deadline Approaching',
    message: 'Final Semester Exam Registration deadline is in 2 days',
    read: false,
    createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000),
  },
  {
    id: '2',
    linkId: '6',
    title: 'Deadline Tomorrow',
    message: 'Hackathon Registration deadline is tomorrow!',
    read: false,
    createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
  },
  {
    id: '3',
    linkId: '4',
    title: 'Reminder',
    message: 'Tech Career Fair 2024 is coming up in 5 days',
    read: true,
    createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000),
  },
];
