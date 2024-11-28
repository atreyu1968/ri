import type { Group } from './masterRecords';

export interface Action {
  id: string;
  name: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
  departments: string[];
  professionalFamilies: string[];
  selectedGroups: string[];
  studentParticipants: number;
  teacherParticipants: number;
  rating: number;
  comments: string;
  createdBy: string;
  network: string;
  center: string;
  quarter: string;
  imageUrl?: string;
  documentUrl?: string;
  documentName?: string;
  createdAt: string;
  updatedAt: string;
}

export type ActionFormData = Omit<Action, 'id' | 'createdAt' | 'updatedAt'>;