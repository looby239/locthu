import { User, DocumentItem, QueryLog } from './types';

export const INITIAL_USERS: User[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    email: 'vana.nguyen@university.edu.vn',
    role: 'giang-vien',
    status: 'active',
    staffId: 'GV001245',
    level: 'Giảng viên chính',
    department: 'Khoa CNTT',
    joinDate: '15/08/2021',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' // Professional picture
  },
  {
    id: '2',
    name: 'Trần Thị B',
    email: 'ttb.admin@univ.edu.vn',
    role: 'admin',
    status: 'active',
    staffId: 'AD2024002',
    level: 'Quản trị viên',
    department: 'Phòng Hành chính',
    joinDate: '10/01/2020',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: '3',
    name: 'Lê Hoàng C',
    email: 'lhc.student@univ.edu.vn',
    role: 'sinh-vien',
    status: 'pending',
    staffId: 'SV2024045',
    level: 'Sinh viên năm 3',
    department: 'Khoa CNTT',
    joinDate: '01/09/2022',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: '4',
    name: 'Phạm Văn D',
    email: 'pvd.lecturer@univ.edu.vn',
    role: 'giang-vien',
    status: 'locked',
    staffId: 'GV2023998',
    level: 'Giảng viên',
    department: 'Khoa Kinh tế',
    joinDate: '15/12/2021',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    title: 'Báo cáo Nghiên cứu Trí tuệ Nhân tạo 2024',
    domain: 'Công nghệ thông tin',
    author: 'TS. Nguyễn Văn A',
    description: 'Báo cáo chi tiết về xu hướng phát triển của Trí tuệ nhân tạo trong năm 2024, tập trung vào ứng dụng trong giáo dục và y tế.',
    publishDate: '15/10/2023',
    status: 'Công khai',
    tags: ['AI', 'Nghiên cứu', 'Deep Learning'],
    fileName: 'Bao_cao_AI_2024_v1.0.pdf',
    fileSize: '2.4 MB',
    versions: [
      {
        version: 'v1.1',
        author: 'Admin User',
        date: '10/10/2023',
        description: 'Cập nhật số liệu Q3'
      },
      {
        version: 'v1.0',
        author: 'TS. Nguyễn Văn A',
        date: '01/10/2023',
        description: 'Phiên bản gốc'
      }
    ]
  },
  {
    id: 'doc-2',
    title: 'Lập trình Python nâng cao cho Khoa học Dữ liệu',
    domain: 'Công nghệ thông tin',
    author: 'Lê Văn A',
    description: 'Tài liệu hướng dẫn tối ưu hiệu năng code Python, xử lý dữ liệu lớn bằng NumPy, Pandas và tối ưu hóa bộ nhớ.',
    publishDate: '12/10/2023',
    status: 'Công khai',
    tags: ['Python', 'Data Science', 'Programming'],
    fileName: 'Python_Nang_Cao_DMRS.docx',
    fileSize: '4.8 MB',
    versions: [
      {
        version: 'v1.0',
        author: 'Lê Văn A',
        date: '12/10/2023',
        description: 'Phát hành chính thức'
      }
    ]
  },
  {
    id: 'doc-3',
    title: 'Tài chính phi tập trung (DeFi) & Ứng dụng Blockchain',
    domain: 'Kinh tế',
    author: 'Nguyễn Thị B',
    description: 'Nghiên cứu về cơ chế vận hành của sàn giao dịch phi tập trung (DEX), smart contract và các rủi ro bảo mật hệ thống.',
    publishDate: '11/10/2023',
    status: 'Chờ xử lý',
    tags: ['Blockchain', 'DeFi', 'Finance'],
    fileName: 'DeFi_Nghien_Cuu_Kinh_Te.pdf',
    fileSize: '3.1 MB',
    versions: [
      {
        version: 'v1.0',
        author: 'Nguyễn Thị B',
        date: '11/10/2023',
        description: 'Nộp bản nháp hội đồng phê duyệt'
      }
    ]
  },
  {
    id: 'doc-4',
    title: 'Dịch tễ học lâm sàng và các Phương pháp can thiệp',
    domain: 'Y dược',
    author: 'PGS. TS. Trần Quốc H',
    description: 'Nghiên cứu về các đợt bùng phát dịch tễ hiện đại và phân tích hiệu lực của vắc-xin thế hệ mới trong cộng đồng.',
    publishDate: '05/09/2023',
    status: 'Nội bộ',
    tags: ['Y tế', 'Dịch tễ', 'Lâm sàng'],
    fileName: 'DichTeHocLamSang_v2.pdf',
    fileSize: '12.5 MB',
    versions: [
      {
        version: 'v2.0',
        author: 'Trần Quốc H',
        date: '05/09/2023',
        description: 'Bổ sung kết quả thử nghiệm lâm sàng giai đoạn 3'
      }
    ]
  }
];

export const INITIAL_QUERY_LOGS: QueryLog[] = [
  {
    id: 'ql-1',
    queryText: 'Trí tuệ nhân tạo giáo dục',
    user: 'vana.nguyen@university.edu.vn',
    timestamp: '2026-06-08 15:10:22',
    ipAddress: '192.168.1.102',
    responseTimeMs: 142,
    status: 'success',
    resultCount: 15
  },
  {
    id: 'ql-2',
    queryText: 'Mô hình ngôn ngữ tự nhiên LLM',
    user: 'ttb.admin@univ.edu.vn',
    timestamp: '2026-06-08 14:55:04',
    ipAddress: '192.168.1.2',
    responseTimeMs: 256,
    status: 'success',
    resultCount: 8
  },
  {
    id: 'ql-3',
    queryText: 'Smart contract vulnerability',
    user: 'lhc.student@univ.edu.vn',
    timestamp: '2026-06-08 14:12:45',
    ipAddress: '172.16.22.45',
    responseTimeMs: 405,
    status: 'success',
    resultCount: 4
  },
  {
    id: 'ql-4',
    queryText: 'Vaccine Trial Results 2025',
    user: 'pvd.lecturer@univ.edu.vn',
    timestamp: '2026-06-08 13:02:18',
    ipAddress: '192.168.10.89',
    responseTimeMs: 82,
    status: 'failed',
    resultCount: 0
  }
];
