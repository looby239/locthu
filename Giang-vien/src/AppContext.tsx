import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  ScreenId,
  Document,
  UserProfile,
  NotificationSettings,
  AiSettings,
  ChatMessage,
} from './types';

interface AppContextType {
  currentScreen: ScreenId;
  navigateTo: (screen: ScreenId, transitionType?: 'push' | 'push_back' | 'slide_up' | 'none') => void;
  transitionType: 'push' | 'push_back' | 'slide_up' | 'none';
  documents: Document[];
  selectedDocIdToEdit: string | null;
  setSelectedDocIdToEdit: (id: string | null) => void;
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  notificationSettings: NotificationSettings;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
  aiSettings: AiSettings;
  updateAiSettings: (settings: Partial<AiSettings>) => void;
  chatHistory: ChatMessage[];
  addChatMessage: (text: string, sender: 'user' | 'ai') => void;
  addNewDocument: (doc: Document) => void;
  updateDocumentData: (doc: Document) => void;
  resetAll: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialDocuments: Document[] = [
  {
    id: 'doc-1',
    name: 'GiaoTrinh_CNPM_2024.pdf',
    subject: 'Công nghệ phần mềm',
    fileType: 'Syllabus',
    uploadDate: '24/10/2023',
    size: '2.4 MB',
    status: 'Thành công',
    description: 'Giáo trình nhập môn Công nghệ phần mềm phiên bản 2024 bao gồm lý thuyết tổng quan về vòng đời phát triển phần mềm Agile và Devops.',
    lastUpdated: '24/10/2023, 10:30',
    updater: 'Hệ thống',
    versionHistory: [
      {
        version: '1.0',
        description: 'Tải lên lần đầu tiên phát hành giáo trình môn học mới.',
        date: '24/10/2023',
        author: 'Hệ thống',
        isCurrent: true,
      }
    ],
    filePath: 'GiaoTrinh_CNPM_2024.pdf',
  },
  {
    id: 'doc-2',
    name: 'BaiGiang_Chuong1_TongQuan.pptx',
    subject: 'Công nghệ phần mềm',
    fileType: 'Slide',
    uploadDate: '25/10/2023',
    size: '5.1 MB',
    status: 'Chờ xử lý',
    description: 'Slide thiết kế bài giảng Chương 1 giới thiệu khái quát quy trình, tính chất phần mềm và công nghệ xây dựng hiện đại.',
    lastUpdated: '25/10/2023, 14:30',
    updater: 'Nguyễn Văn A',
    versionHistory: [
      {
        version: '1.0',
        description: 'Bản thiết kế bài giảng ban đầu sử dụng cho kỳ học Thu 2023.',
        date: '25/10/2023',
        author: 'Nguyễn Văn A',
        isCurrent: true,
      }
    ],
    filePath: 'BaiGiang_Chuong1_TongQuan.pptx',
  },
  {
    id: 'doc-3',
    name: 'DanhSach_DeTai_BTL.docx',
    subject: 'Cơ sở dữ liệu',
    fileType: 'Tham khảo',
    uploadDate: '20/10/2023',
    size: '120 KB',
    status: 'Thành công',
    description: 'Danh sách bài tập lớn tự chọn cho môn học Cơ sở dữ liệu và yêu cầu kỹ thuật chi tiết.',
    lastUpdated: '20/10/2023, 09:15',
    updater: 'Nguyễn Văn A',
    versionHistory: [
      {
        version: '1.0',
        description: 'Tải lên quy chế chuẩn và barem điểm chấm Đồ án môn học.',
        date: '20/10/2023',
        author: 'Nguyễn Văn A',
        isCurrent: true,
      }
    ],
    filePath: 'DanhSach_DeTai_BTL.docx',
  },
  {
    id: 'doc-4',
    name: 'Để cương Chi tiết Hệ điều hành.pdf',
    subject: 'Hệ điều hành',
    fileType: 'Syllabus',
    uploadDate: '24/10/2023',
    size: '1.8 MB',
    status: 'Thành công',
    description: 'Đề cương chi tiết môn học Hệ điều hành của trường cập nhật cấu trúc tiến trình, bộ nhớ ảo và an toàn hệ thống.',
    lastUpdated: '24/10/2023, 10:30',
    updater: 'Hệ thống',
    versionHistory: [
      {
        version: '1.0',
        description: 'Cập nhật định dạng chuẩn ISO đề cương.',
        date: '24/10/2023',
        author: 'Hệ thống',
        isCurrent: true,
      }
    ]
  },
  {
    id: 'doc-5',
    name: 'Slide_Bai1_TongQuan.docx',
    subject: 'Mạng máy tính',
    fileType: 'Slide',
    uploadDate: '24/10/2023',
    size: '3.2 MB',
    status: 'Chờ xử lý',
    description: 'Slide tổng quan về kiến trúc mạng máy tính, các mô hình OSI và TCP/IP cơ bản.',
    lastUpdated: '24/10/2023, 09:15',
    updater: 'Nguyễn Văn A',
    versionHistory: [
      {
        version: '1.0',
        description: 'Chỉnh sửa tài liệu bài giảng gốc.',
        date: '24/10/2023',
        author: 'Nguyễn Văn A',
        isCurrent: true,
      }
    ]
  },
  {
    id: 'doc-6',
    name: 'Huong_dan_thuc_hanh_C.pdf',
    subject: 'Lập trình C',
    fileType: 'Tham khảo',
    uploadDate: '23/10/2023',
    size: '1.2 MB',
    status: 'Lỗi',
    description: 'Tài liệu hướng dẫn cài đặt môi trường và các bài tập thực hành lập trình C cơ bản cho sinh viên năm nhất.',
    lastUpdated: '23/10/2023, 16:45',
    updater: 'Nguyễn Văn A',
    versionHistory: [
      {
        version: '1.0',
        description: 'Bản thảo hướng dẫn thực tế.',
        date: '23/10/2023',
        author: 'Nguyễn Văn A',
        isCurrent: true,
      }
    ]
  }
];

const initialChatHistory: ChatMessage[] = [
  {
    id: 'chat-0',
    sender: 'ai',
    text: `Xin chào! Tôi là trợ lý AI dành cho Giảng viên. Tôi đã được kết nối với các tài liệu bạn chọn trong phần Nguồn dữ liệu.

Bạn muốn hỏi thông tin gì từ: **Giáo trình Cấu trúc dữ liệu 2023.pdf** và **Quy chế đào tạo Tín chỉ v2.pdf**?`,
    timestamp: '15:20',
  },
  {
    id: 'chat-1',
    sender: 'user',
    text: 'Theo quy chế tín chỉ, sinh viên được vắng tối đa bao nhiêu phần trăm số tiết học để đủ điều kiện thi cuối kỳ?',
    timestamp: '15:22',
  },
  {
    id: 'chat-2',
    sender: 'ai',
    text: `Theo quy định hiện hành tại trường, điều kiện dự thi kết thúc học phần liên quan đến chuyên cần như sau:

Sinh viên không được vắng mặt quá **20%** tổng số giờ học của học phần (bao gồm cả lý thuyết và thực hành). Nếu vượt quá tỷ lệ này, sinh viên sẽ bị cấm thi và nhận điểm F cho học phần đó.`,
    citations: [
      {
        id: 1,
        snippet: 'Sinh viên vắng mặt quá 20% số tiết quy định của học phần sẽ không được dự thi kết thúc học phần...',
        source: 'Quy chế đào tạo Tín chỉ v2.pdf',
        page: 15,
        clause: 'Điều 12',
      }
    ],
    timestamp: '15:23',
  }
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('login');
  const [transitionType, setTransitionType] = useState<'push' | 'push_back' | 'slide_up' | 'none'>('none');
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [selectedDocIdToEdit, setSelectedDocIdToEdit] = useState<string | null>('doc-1'); // default to doc-1 so first click works perfectly
  const [userProfile, setUserProfile] = useState<UserProfile>({
    fullName: 'Nguyễn Văn A',
    msgv: 'GV2023001',
    department: 'Khoa Khoa học Máy tính',
    email: 'nguyenvana@university.edu.vn',
    phone: '0901234567',
  });
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    studentQuestion: true,
    aiProcessed: true,
    systemAlert: false,
  });
  const [aiSettings, setAiSettings] = useState<AiSettings>({
    autoCite: true,
    prioritizePersonal: true,
  });
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(initialChatHistory);

  const navigateTo = (screen: ScreenId, transition: 'push' | 'push_back' | 'slide_up' | 'none' = 'none') => {
    setTransitionType(transition);
    setCurrentScreen(screen);
  };

  const updateUserProfile = (newProfile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...newProfile }));
  };

  const updateNotificationSettings = (newSettings: Partial<NotificationSettings>) => {
    setNotificationSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const updateAiSettings = (newSettings: Partial<AiSettings>) => {
    setAiSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const addChatMessage = (text: string, sender: 'user' | 'ai') => {
    const freshMessage: ChatMessage = {
      id: `chat-${Date.now()}`,
      sender,
      text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    if (sender === 'user') {
      setChatHistory((prev) => [...prev, freshMessage]);
      
      // Simulate clever AI response matching the documents or fallback
      setTimeout(() => {
        let aiText = '';
        let citations: ChatMessage['citations'] = undefined;
        
        const lower = text.toLowerCase();
        if (lower.includes('công nghệ phần mềm') || lower.includes('cnpm')) {
          aiText = 'Dựa trên **GiaoTrinh_CNPM_2024.pdf**, Agile được giảng dạy tại Chương 3 với trọng tâm là Scrum Framework. Sinh viên cần nắm rõ 3 vai trò (Product Owner, Scrum Master, Developers), 5 sự kiện và 3 tạo tác.';
          citations = [{
            id: 1,
            snippet: 'Agile và quy trình Scrum truyền thống được phân chia thành các Sprint từ 1-4 tuần...',
            source: 'GiaoTrinh_CNPM_2024.pdf',
            page: 45,
            clause: 'Chương 3 - Mục 3.2'
          }];
        } else if (lower.includes('hệ điều hành')) {
          aiText = 'Theo **Đề cương Chi tiết Hệ điều hành.pdf**, môn học này bao gồm 3 tín chỉ với thời lượng thực hành phòng máy là 15 tiết. Điều kiện tiên quyết là sinh viên phải hoàn thành môn Kiến trúc máy tính.';
          citations = [{
            id: 1,
            snippet: 'Điều kiện tiên quyết: Tin học đại cương, Kiến trúc máy tính và Hợp ngữ...',
            source: 'Để cương Chi tiết Hệ điều hành.pdf',
            page: 2,
            clause: 'Mục II - Điều kiện'
          }];
        } else if (lower.includes('cơ sở dữ liệu') || lower.includes('csdl')) {
          aiText = 'Trong **DanhSach_DeTai_BTL.docx**, có tổng cộng 12 đề tài tự chọn về thiết kế hệ thống quản lý cơ sở dữ liệu. Nhóm sinh viên tối đa là 3 người và hạn nộp đề xuất là ngày 15/11/2023.';
          citations = [{
            id: 1,
            snippet: 'Yêu cầu: Thiết kế mô hình ERD, chuẩn hóa 3NF và viết truy vấn SQL chi tiết...',
            source: 'DanhSach_DeTai_BTL.docx',
            page: 1,
            clause: 'Yêu cầu chung - Đề tài BTL'
          }];
        } else if (lower.includes('mạng máy tính')) {
          aiText = 'Theo quy chế của phòng thực hành Mạng máy tính, sinh viên cần đạt tối thiểu 5.0 điểm bài tập lab để đủ điều kiện thi thực hành cuối kỳ.';
          citations = [{
            id: 1,
            snippet: 'Bài tập Lab 1-5 chiếm 20% tổng số điểm học phần...',
            source: 'Slide_Bai1_TongQuan.docx',
            page: 4,
            clause: 'Đánh giá môn học'
          }];
        } else {
          aiText = `Cảm ơn bạn đã hỏi về: "${text}". Dựa trên các tài liệu giảng dạy của bạn hiện có trong hệ thống, hệ thống ghi nhận và đề xuất bạn có thể tham khảo thêm tài liệu hướng dẫn giảng dạy ở Kho tài liệu để giải đáp chi tiết cho sinh viên.`;
        }

        const aiResponse: ChatMessage = {
          id: `chat-${Date.now() + 1}`,
          sender: 'ai',
          text: aiText,
          citations,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        };
        setChatHistory((prev) => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const addNewDocument = (doc: Document) => {
    setDocuments((prev) => [doc, ...prev]);
  };

  const updateDocumentData = (updatedDoc: Document) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === updatedDoc.id ? updatedDoc : doc))
    );
  };

  const resetAll = () => {
    setDocuments(initialDocuments);
    setSelectedDocIdToEdit('doc-1');
    setUserProfile({
      fullName: 'Nguyễn Văn A',
      msgv: 'GV2023001',
      department: 'Khoa Khoa học Máy tính',
      email: 'nguyenvana@university.edu.vn',
      phone: '0901234567',
    });
    setNotificationSettings({
      studentQuestion: true,
      aiProcessed: true,
      systemAlert: false,
    });
    setAiSettings({
      autoCite: true,
      prioritizePersonal: true,
    });
    setChatHistory(initialChatHistory);
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        navigateTo,
        transitionType,
        documents,
        selectedDocIdToEdit,
        setSelectedDocIdToEdit,
        userProfile,
        updateUserProfile,
        notificationSettings,
        updateNotificationSettings,
        aiSettings,
        updateAiSettings,
        chatHistory,
        addChatMessage,
        addNewDocument,
        updateDocumentData,
        resetAll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
