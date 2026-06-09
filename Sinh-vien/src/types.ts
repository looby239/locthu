/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ScreenId =
  | 'login'
  | 'ai-retrieval'
  | 'classify'
  | 'pass-recovery'
  | 'settings'
  | 'all-documents'
  | 'saved-answers';

export interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  table?: {
    headers: string[];
    rows: {
      columns: string[];
      status?: 'success' | 'warning' | 'error';
    }[];
  };
  suggestions?: string[];
  isSaved?: boolean;
}

export interface AcademicDoc {
  id: string;
  title: string;
  author: string;
  date: string;
  type: 'PDF' | 'DOCX' | 'SLIDE' | 'XLSX';
  views: number;
  category: 'cntt' | 'kinhte' | 'ngonngu' | 'thietke';
  size: string;
  recent?: boolean;
}

export interface SavedAnswer {
  id: string;
  title: string;
  category: 'Academic' | 'Technical' | 'Policy' | 'General';
  date: string;
  content: string;
}

export interface UserProfile {
  name: string;
  mssv: string;
  className: string;
  department: string;
  email: string;
  avatarUrl: string;
}

export interface SystemSettings {
  profile: UserProfile;
  notifications: {
    newDocuments: boolean;
    lecturerUpdates: boolean;
  };
}
