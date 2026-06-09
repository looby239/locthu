export enum Screen {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  USER_MANAGEMENT = 'USER_MANAGEMENT',
  DOCUMENT_HUB = 'DOCUMENT_HUB',
  EDIT_USER = 'EDIT_USER',
  ADD_USER = 'ADD_USER',
  QUERY_STATS = 'QUERY_STATS',
  CATEGORIES = 'CATEGORIES',
  EDIT_DOCUMENT = 'EDIT_DOCUMENT',
  UPLOAD_DOCUMENT = 'UPLOAD_DOCUMENT',
  PASS_RECOVERY = 'PASS_RECOVERY'
}

export interface User {
  id: string; // internal id
  name: string; // họ và tên
  email: string; // email công vụ
  role: 'admin' | 'giang-vien' | 'sinh-vien'; // select options
  status: 'active' | 'pending' | 'locked'; // Đang hoạt động, Chờ xác nhận, Bị khóa
  staffId: string; // Mã số nhân viên / sinh viên
  level: string; // Cấp bậc
  department: string; // Khoa / Phòng ban
  avatar?: string;
  joinDate?: string; // Ngày tham gia
}

export interface DocVersion {
  version: string;
  author: string;
  date: string;
  description: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  domain: string; // Lĩnh vực, e.g. "Công nghệ thông tin", "Kinh tế"
  author: string; // Tác giả
  description: string; // Mô tả
  publishDate: string; // Ngày phát hành
  status: 'Công khai' | 'Nội bộ' | 'Chờ xử lý'; // Trạng thái
  tags: string[]; // Từ khóa
  fileName: string;
  fileSize: string;
  versions: DocVersion[];
}

export interface QueryLog {
  id: string;
  queryText: string;
  user: string;
  timestamp: string;
  ipAddress: string;
  responseTimeMs: number;
  status: 'success' | 'failed';
  resultCount: number;
}
