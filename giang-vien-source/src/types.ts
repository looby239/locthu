export type ScreenId =
  | 'login'                  // Screen 9379913065481017972
  | 'forgot_password'        // Screen 15231317615303261390
  | 'dashboard'              // Bảng điều khiển (Giảng viên) - DMRS
  | 'repository'             // Kho tài liệu (Giảng viên) - DMRS
  | 'edit_document'          // Chỉnh sửa tài liệu (Giảng viên) - DMRS
  | 'settings'               // Cài đặt (Giảng viên) - DMRS
  | 'chat_ai'                // Chat AI (Giảng viên) - DMRS
  | 'upload_document';       // Tải lên tài liệu (Giảng viên) - DMRS

export interface VersionInfo {
  version: string;
  description: string;
  date: string;
  author: string;
  isCurrent?: boolean;
}

export interface Document {
  id: string;
  name: string;
  subject: string;
  fileType: 'Syllabus' | 'Slide' | 'Tham khảo' | 'Bài tập' | 'Quy chế';
  uploadDate: string;
  size: string;
  status: 'Thành công' | 'Chờ xử lý' | 'Lỗi';
  description: string;
  lastUpdated: string;
  updater: string;
  versionHistory: VersionInfo[];
  filePath?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  citations?: Array<{
    id: number;
    snippet: string;
    source: string;
    page: number;
    clause: string;
  }>;
  timestamp: string;
}

export interface UserProfile {
  fullName: string;
  msgv: string;
  department: string;
  email: string;
  phone: string;
}

export interface NotificationSettings {
  studentQuestion: boolean;
  aiProcessed: boolean;
  systemAlert: boolean;
}

export interface AiSettings {
  autoCite: boolean;
  prioritizePersonal: boolean;
}
