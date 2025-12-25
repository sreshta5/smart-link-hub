export type LinkCategory = 'exams' | 'internships' | 'scholarships' | 'events' | 'applications';

export type LinkStatus = 'not_applied' | 'applied' | 'expired';

export interface SavedLink {
  id: string;
  title: string;
  url: string;
  category: LinkCategory;
  deadline: Date;
  reminderTime: Date;
  notes?: string;
  status: LinkStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  linkId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}
