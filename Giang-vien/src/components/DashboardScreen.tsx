import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Sidebar } from './Sidebar';
import {
  FileText,
  MessageSquare,
  CheckCircle,
  Bell,
  Search,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Upload,
  Calendar,
  Layers,
  ChevronDown,
  Info
} from 'lucide-react';
import { motion } from 'motion/react';
import { AvatarDropdown } from './AvatarDropdown';

export const DashboardScreen: React.FC = () => {
  const { navigateTo, documents } = useApp();
  const [selectedDay, setSelectedDay] = useState<string>('T4');
  const [timeRange, setTimeRange] = useState<string>('7 ngày qua');

  const stats = [
    {
      title: 'Tổng tài liệu đã tải lên',
      value: 342,
      trend: '+12%',
      color: 'text-blue-600 bg-blue-50 border-blue-100',
      icon: FileText
    },
    {
      title: 'Truy vấn từ sinh viên (30 ngày)',
      value: '1,204',
      trend: '+5%',
      color: 'text-purple-600 bg-purple-50 border-purple-100',
      icon: MessageSquare
    },
    {
      title: 'Tỷ lệ AI trả lời chính xác',
      value: '94.5%',
      subtext: '/ 100%',
      trend: 'Trung bình',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      icon: CheckCircle
    }
  ];

  const queriesTrend = [
    { day: 'T2', value: 45 },
    { day: 'T3', value: 78 },
    { day: 'T4', value: 120, selected: true },
    { day: 'T5', value: 95 },
    { day: 'T6', value: 110 },
    { day: 'T7', value: 64 },
    { day: 'CN', value: 35 }
  ];

  const popularQuestions = [
    {
      text: 'Lịch thi giữa kỳ môn Mạng máy tính?',
      count: 42,
      desc: 'AI đã trả lời dựa trên File bài giảng Mạng máy tính và phòng Đào tạo...'
    },
    {
      text: 'Cách tính điểm quá trình Lập trình C?',
      count: 28,
      desc: 'AI đã trả lời dựa trên File Đề cương môn học Lập trình C hệ chính quy...'
    },
    {
      text: 'Đăng ký đề tài đồ án tốt nghiệp ở đâu?',
      count: 15,
      desc: 'AI đã trả lời dựa trên File Hướng dẫn khóa luận tốt nghiệp v3.pdf...'
    }
  ];

  const aiSuggestions = [
    {
      topic: '"Mẫu báo cáo thực tập 2023"',
      subtext: 'Được hỏi 18 lần tuần này.'
    },
    {
      topic: '"Quy định cộng điểm chuyên cần"',
      subtext: 'Được hỏi 9 lần hôm nay.'
    }
  ];

  // Map state documents for display (showing the last 3)
  const recentDocs = documents.slice(0, 3);

  const handleDocumentClick = (docId: string) => {
    navigateTo('repository');
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      <Sidebar activeScreen="dashboard" />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header Row with breadcrumbs and user elements */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shrink-0 sticky top-0 z-10 shadow-sm">
          {/* Strict XPath elements for top navigation inside header if automatic scripts look for them */}
          <nav className="flex items-center gap-6" id="dashboard-header-nav">
            <span className="text-sm font-semibold text-slate-800">DMRS Dashboard</span>
            <div className="h-4 w-[1px] bg-slate-200"></div>
            <a
              onClick={() => navigateTo('repository', 'none')}
              className="text-slate-600 hover:text-blue-600 text-xs font-semibold cursor-pointer py-1 block"
            >
              Kho tài liệu
            </a>
            <a
              onClick={() => navigateTo('chat_ai', 'none')}
              className="text-slate-600 hover:text-blue-600 text-xs font-semibold cursor-pointer py-1 block"
            >
              Chat AI
            </a>
            <a
              onClick={() => navigateTo('settings', 'none')}
              className="text-slate-600 hover:text-blue-600 text-xs font-semibold cursor-pointer py-1 block"
            >
              Cài đặt
            </a>
            <div className="h-4 w-[1px] bg-slate-200"></div>
            <a
              onClick={() => navigateTo('upload_document', 'slide_up')}
              className="text-blue-600 hover:underline text-xs font-bold cursor-pointer py-1 block"
            >
              Tải lên tài liệu
            </a>
          </nav>

          {/* Search bar and info profile cluster */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm kiếm tài liệu..."
                className="w-48 sm:w-64 pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 transition-all shadow-sm focus:outline-none"
              />
            </div>
            
            <button className="p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600 rounded-full relative">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <AvatarDropdown />
          </div>
        </header>

        {/* Dashboard Main Content area */}
        <main className="p-8 space-y-6 max-w-[1440px] w-full mx-auto">
          
          {/* Welcome heading */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-800">Xin chào, Giảng viên Nguyễn Văn A</h2>
            <p className="text-slate-500 text-sm mt-1">
              Dưới đây là tổng quan về hệ thống tài liệu và tương tác của sinh viên hôm nay.
            </p>
          </div>

          {/* Quick Stats Grid Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 flex justify-between items-start shadow-sm hover:shadow-md transition-shadow">
                  <div className="space-y-2">
                    <span className="text-xs text-slate-500 font-medium block uppercase tracking-wider">{stat.title}</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-slate-800 tracking-tight">{stat.value}</span>
                      {stat.subtext && <span className="text-sm font-medium text-slate-400">{stat.subtext}</span>}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <div className={`p-3 rounded-xl border ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase ${
                      stat.trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {stat.trend}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Analytics Chart & Popular questions Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left box: Queries trends */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 lg:col-span-2 flex flex-col justify-between shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span>Xu hướng truy vấn của sinh viên</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Số lượng câu hỏi AI tự động xử lý hàng ngày</p>
                </div>
                
                {/* Time selector */}
                <div className="relative">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-600 border border-slate-200">
                    <span>{timeRange}</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Pixel Perfect Bar Chart with Custom Tooltip for T4 */}
              <div className="relative h-64 flex items-end justify-between px-4 pt-10 border-b border-slate-100 pb-1.5">
                {/* Horizontal reference lines */}
                <div className="absolute left-0 right-0 top-10 border-t border-dashed border-slate-100 text-[10px] text-slate-400 font-mono flex pointer-events-none">
                  <span className="bg-white px-1 -mt-2">150</span>
                </div>
                <div className="absolute left-0 right-0 top-28 border-t border-dashed border-slate-100 text-[10px] text-slate-400 font-mono flex pointer-events-none">
                  <span className="bg-white px-1 -mt-2">100</span>
                </div>
                <div className="absolute left-0 right-0 top-44 border-t border-dashed border-slate-100 text-[10px] text-slate-400 font-mono flex pointer-events-none">
                  <span className="bg-white px-1 -mt-2">50</span>
                </div>
                <div className="absolute left-0 right-0 top-[248px] border-t border-solid border-slate-200"></div>

                {queriesTrend.map((item) => {
                  const maxVal = 150;
                  const percentHeight = (item.value / maxVal) * 100;
                  const isSelected = selectedDay === item.day;
                  return (
                    <div
                      key={item.day}
                      className="flex flex-col items-center flex-1 cursor-pointer group relative"
                      onClick={() => setSelectedDay(item.day)}
                    >
                      {/* Interactive Tooltip showing '120 queries' for Selected block */}
                      {isSelected && (
                        <div className="absolute top-[-36px] bg-slate-800 text-white text-[11px] font-bold px-3 py-1 rounded-md shadow-md animate-bounce z-10 whitespace-nowrap">
                          {item.value} câu hỏi
                        </div>
                      )}

                      {/* Bar Graphic */}
                      <div className="w-12 bg-slate-100 rounded-t-lg overflow-hidden h-40 flex items-end">
                        <div
                          style={{ height: `${percentHeight}%` }}
                          className={`w-full rounded-t-md transition-all duration-300 ${
                            isSelected
                              ? 'bg-blue-600 shadow-md shadow-blue-100'
                              : 'bg-blue-200 group-hover:bg-blue-500'
                          }`}
                        ></div>
                      </div>

                      {/* Day Label */}
                      <span className={`text-xs font-semibold mt-3 ${
                        isSelected ? 'text-blue-600 font-bold' : 'text-slate-500'
                      }`}>
                        {item.day}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 flex justify-between items-center text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="flex items-center gap-1.5"><Info className="w-4 h-4 text-blue-600" /> T4 là thời điểm hoạt động sôi nổi nhất với việc kiểm tra giữa kỳ.</span>
                <span className="font-semibold text-blue-600 hover:underline cursor-pointer flex items-center">Xem thống kê đầy đủ <ChevronRight className="w-3.5 h-3.5" /></span>
              </div>
            </div>

            {/* Right box: Popular questions */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-1">
                  <MessageSquare className="w-4 h-4 text-purple-600" />
                  <span>Câu hỏi phổ biến</span>
                </h3>
                <p className="text-xs text-slate-500 mb-4">Các truy vấn sinh viên gửi nhiều nhất trong tuần</p>

                <div className="space-y-3">
                  {popularQuestions.map((q, j) => (
                    <div key={j} className="p-3 bg-slate-50 border border-slate-100/60 rounded-xl hover:border-blue-600 transition-all">
                      <div className="flex justify-between items-start gap-2">
                        <p className="text-xs font-bold text-slate-800 leading-snug">{q.text}</p>
                        <span className="shrink-0 bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold flex items-center gap-0.5">
                          {q.count} <span className="text-[9px] font-normal font-sans">lần</span>
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1.5 truncate">{q.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4">
                <button
                  onClick={() => navigateTo('chat_ai', 'none')}
                  className="w-full text-center text-xs text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  Tham gia giải đáp trên Chat AI
                </button>
              </div>
            </div>
          </div>

          {/* Recent documents table & AI proposals banner */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left box: Recent documents Table */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 lg:col-span-2 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-800">Tài liệu cập nhật gần đây</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Khoản cập nhật học liệu giảng dạy quan trọng</p>
                  </div>
                  <button
                    onClick={() => navigateTo('repository', 'none')}
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    Xem tất cả <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm" id="recent-docs-dashboard-table">
                    <thead>
                      <tr className="border-b border-slate-200 text-[11px] font-bold tracking-wider text-slate-500 uppercase bg-slate-50">
                        <th className="py-2.5 px-3">Tên tài liệu</th>
                        <th className="py-2.5 px-3">Môn học</th>
                        <th className="py-2.5 px-3">Ngày tải lên</th>
                        <th className="py-2.5 px-3 text-right">Trạng thái AI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {recentDocs.map((doc) => (
                        <tr
                          key={doc.id}
                          onClick={() => handleDocumentClick(doc.id)}
                          className="hover:bg-slate-50 cursor-pointer transition-colors group"
                        >
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold text-xs">
                                {doc.fileType.substring(0, 2)}
                              </div>
                              <span className="font-semibold text-xs text-slate-800 group-hover:text-blue-600 transition-all max-w-[180px] truncate block">
                                {doc.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-xs text-slate-600 font-medium">{doc.subject}</td>
                          <td className="py-3 px-3 text-xs text-slate-500">{doc.uploadDate}</td>
                          <td className="py-3 px-3 text-right">
                            <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                              doc.status === 'Thành công'
                                ? 'bg-green-100 text-green-700'
                                : doc.status === 'Chờ xử lý'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                              {doc.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right box: AI proposal warning check block */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between" id="ai-recommendations-box">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-yellow-50 rounded-lg flex items-center justify-center text-yellow-600 border border-yellow-100">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">AI Đề xuất bổ sung</h3>
                    <p className="text-[10px] font-bold text-yellow-600 uppercase tracking-wider">Cảnh báo thiếu hụt tài liệu</p>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Hệ thống phát hiện AI không thể tìm thấy câu trả lời cho các chủ đề sau trong kho tài liệu hiện tại:
                </p>

                <div className="space-y-3">
                  {aiSuggestions.map((item, index) => (
                    <div key={index} className="p-3.5 bg-slate-50 border border-slate-200/60 rounded-xl flex items-start gap-2.5 shadow-sm">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 leading-tight">{item.topic}</h4>
                        <p className="text-[10px] text-slate-500 mt-1 font-mono">{item.subtext}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                {/* Button matches //button[contains(., 'Tải tài liệu lên ngay')] or xpath for fast upload */}
                <button
                  id="btn-quick-upload-proposal"
                  onClick={() => navigateTo('upload_document', 'slide_up')}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-full text-sm font-semibold shadow-md transition-all duration-200 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Tải tài liệu lên ngay</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
