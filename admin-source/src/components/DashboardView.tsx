import React from 'react';
import { 
  FileText, Users, Clock, CheckCircle, ArrowUpRight, 
  Upload, UserPlus, Database, ArrowRight 
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Screen, DocumentItem, User } from '../types';

interface DashboardViewProps {
  documents: DocumentItem[];
  users: User[];
  onNavigate: (screen: Screen, transition?: 'slide_up' | 'push_back' | 'none') => void;
  setSelectedDocId: (id: string) => void;
}

const DASHBOARD_CHART_DATA = [
  { name: 'T1', docs: 210, queries: 1400 },
  { name: 'T2', docs: 250, queries: 1800 },
  { name: 'T3', docs: 310, queries: 2300 },
  { name: 'T4', docs: 380, queries: 2100 },
  { name: 'T5', docs: 420, queries: 2700 },
  { name: 'T6', docs: 452, queries: 3200 },
];

export default function DashboardView({ 
  documents, 
  users, 
  onNavigate, 
  setSelectedDocId 
}: DashboardViewProps) {
  
  // High-level values
  const totalDocs = 4512 + (documents.length - 4); // maintain state adding
  const activeUsersCount = users.filter(u => u.status === 'active').length + 1244;
  const pendingDocsCount = documents.filter(d => d.status === 'Chờ xử lý').length;
  
  return (
    <div className="space-y-8 animate-fade-in font-sans">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">Bảng điều khiển</h2>
          <p className="text-sm text-on-surface-variant mt-1">
            Chào mừng trở lại, <span className="font-semibold text-primary">Admin User</span>. Hệ thống DMRS đang vận hành tối ưu.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate(Screen.ADD_USER, 'none')}
            className="px-4 py-2 border border-outline-variant hover:border-primary text-slate-700 bg-white hover:bg-slate-50 font-semibold text-sm rounded-lg flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <UserPlus className="w-4 h-4 text-primary" />
            Thêm người dùng mới
          </button>
          <button 
            onClick={() => onNavigate(Screen.UPLOAD_DOCUMENT, 'slide_up')}
            className="px-4 py-2 bg-primary text-white font-semibold text-sm rounded-lg hover:opacity-95 shadow-sm active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            Tải lên tài liệu
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="bg-white p-6 rounded-xl border border-outline-variant hover:shadow-md transition-all flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-primary rounded-lg flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-outline font-medium">Tổng số tài liệu</p>
            <h3 className="text-2xl font-bold text-on-surface mt-0.5">{totalDocs.toLocaleString()}</h3>
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
              +12% <ArrowUpRight className="w-3.5 h-3.5" />
              <span className="text-[10px] text-outline font-medium ml-1">tháng này</span>
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-6 rounded-xl border border-outline-variant hover:shadow-md transition-all flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-outline font-medium">Tổng số người dùng</p>
            <h3 className="text-2xl font-bold text-on-surface mt-0.5">{activeUsersCount.toLocaleString()}</h3>
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
              +1k <ArrowUpRight className="w-3.5 h-3.5" />
              <span className="text-[10px] text-outline font-medium ml-1">thành viên hoạt động</span>
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-6 rounded-xl border border-outline-variant hover:shadow-md transition-all flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-outline font-medium">Tài liệu chờ xử lý</p>
            <h3 className="text-2xl font-bold text-on-surface mt-0.5">{pendingDocsCount}</h3>
            <span className="text-xs text-amber-600 font-semibold flex items-center gap-1 mt-1">
              <span>Cần duyệt duyệt gấp</span>
            </span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-6 rounded-xl border border-outline-variant hover:shadow-md transition-all flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-outline font-medium">Độ chính xác truy vấn</p>
            <h3 className="text-2xl font-bold text-on-surface mt-0.5">99.2%</h3>
            <span className="text-xs text-indigo-600 font-semibold flex items-center gap-1 mt-1">
              <span>Hạ tầng đám mây tối ưu</span>
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Charts & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Charts block - 8 cols */}
        <div className="bg-white p-6 rounded-xl border border-outline-variant lg:col-span-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-on-surface">Xu hướng truy xuất tài liệu</h3>
              <p className="text-xs text-outline mt-0.5">Sự phát triển kho tài liệu và số lượt truy vấn qua các tháng.</p>
            </div>
            <div className="flex gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-primary rounded-full"></span>Tài liệu</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>Truy vấn</span>
            </div>
          </div>
          
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DASHBOARD_CHART_DATA} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorDocs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} />
                <YAxis stroke="#888888" fontSize={11} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="docs" name="Số lượng tài liệu" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorDocs)" />
                <Area type="monotone" dataKey="queries" name="Lượt truy cập" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorQueries)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Analytics Highlights & Shortcuts - 4 cols */}
        <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 lg:col-span-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="bg-slate-800 text-teal-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Database className="w-3 h-3 text-teal-400" />
                Trạng thái hoạt động
              </span>
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
            </div>
            
            <h3 className="text-lg font-bold mt-4 leading-snug">Hệ thống phân tích tài liệu tự động</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              DMRS đang phân loại và lập chỉ mục (index) tài liệu tự động bằng các kỹ thuật xử lý ngôn ngữ tự nhiên tối tân nhất.
            </p>
          </div>

          <div className="space-y-3.5 mt-6 border-t border-slate-800 pt-6">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Thời gian chạy tối đa (Uptime)</span>
              <span className="font-mono text-emerald-400">99.98%</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Tốc độ xử lý trung bình</span>
              <span className="font-mono text-emerald-400">1.2ms / file</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Bộ nhớ lưu trữ</span>
              <span className="font-mono text-blue-400">12.4 GB / 100 GB</span>
            </div>
          </div>

          <button 
            onClick={() => onNavigate(Screen.QUERY_STATS, 'none')}
            className="w-full mt-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer group"
          >
            Truy cập Thống kê truy vấn
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Recent Documents Table section */}
      <div className="bg-white rounded-xl border border-outline-variant p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-on-surface">Tài liệu mới cập nhật</h3>
            <p className="text-xs text-outline mt-0.5">Tài liệu nghiên cứu khoa học vừa được lưu trữ gần đây.</p>
          </div>
          <button 
            onClick={() => onNavigate(Screen.DOCUMENT_HUB, 'none')}
            className="text-primary text-xs font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            Xem tất cả tài liệu <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto custom-scrollbar -mx-6">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-surface border-b border-outline-variant text-[11px] uppercase tracking-wider text-outline font-bold">
                <th className="py-3 px-6">Tên tài liệu</th>
                <th className="py-3 px-6">Thuộc lĩnh vực</th>
                <th className="py-3 px-6">Người tạo (Tác giả)</th>
                <th className="py-3 px-6">Ngày tạo</th>
                <th className="py-3 px-6 text-center">Trạng thái</th>
                <th className="py-3 px-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {documents.slice(0, 3).map((doc) => (
                <tr key={doc.id} className="border-b border-slate-100 hover:bg-slate-50/60 transition-all text-xs font-medium text-slate-800">
                  <td className="py-3 px-6 max-w-[280px]">
                    <div className="font-bold text-slate-900 truncate" title={doc.title}>{doc.title}</div>
                    <div className="text-[10px] text-outline font-medium mt-0.5">{doc.fileName} • {doc.fileSize}</div>
                  </td>
                  <td className="py-3 px-6">
                    <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-sm text-[10px] font-bold">
                      {doc.domain}
                    </span>
                  </td>
                  <td className="py-3 px-6 font-semibold">{doc.author}</td>
                  <td className="py-3 px-6 text-outline">{doc.publishDate}</td>
                  <td className="py-3 px-6 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider ${
                      doc.status === 'Công khai' ? 'bg-emerald-50 text-emerald-700' :
                      doc.status === 'Chờ xử lý' ? 'bg-amber-50 text-amber-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-right space-x-2">
                    <button 
                      onClick={() => {
                        setSelectedDocId(doc.id);
                        onNavigate(Screen.EDIT_DOCUMENT, 'none');
                      }}
                      className="px-2 py-1 text-primary hover:bg-blue-50 rounded font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Sửa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
