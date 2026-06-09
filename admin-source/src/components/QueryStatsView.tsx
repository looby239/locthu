import React from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { Activity, Clock, Search, ShieldAlert, Cpu, Heart, CheckCircle, Database } from 'lucide-react';
import { Screen, QueryLog } from '../types';

interface QueryStatsViewProps {
  queryLogs: QueryLog[];
  onNavigate: (screen: Screen, transition?: 'slide_up' | 'push_back' | 'none') => void;
}

const RESPONSE_TIME_DATA = [
  { time: '09:00', value: 120 },
  { time: '10:00', value: 180 },
  { time: '11:00', value: 240 },
  { time: '12:00', value: 95 },
  { time: '13:00', value: 150 },
  { time: '14:00', value: 310 },
  { time: '15:00', value: 142 },
];

const SEARCH_VOLUME_DATA = [
  { name: 'Trí tuệ nhân tạo', volume: 450 },
  { name: 'Blockchain', volume: 320 },
  { name: 'Lâm sàng', volume: 180 },
  { name: 'Học máy', volume: 290 },
  { name: 'Kinh tế số', volume: 210 },
];

const STATUS_PIE_DATA = [
  { name: 'Thành công (Success)', value: 94 },
  { name: 'Thất bại (Failed)', value: 6 },
];

const PIE_COLORS = ['#10B981', '#EF4444'];

export default function QueryStatsView({ queryLogs, onNavigate }: QueryStatsViewProps) {
  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Title */}
      <div>
        <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">Thống kê truy vấn</h2>
        <p className="text-sm text-on-surface-variant mt-1">
          Giám sát hoạt động truy xuất, hiệu năng truy vấn dữ liệu từ bộ máy tìm kiếm thông minh DMRS.
        </p>
      </div>

      {/* Grid of Key stats metrics cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-xl border border-outline-variant flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-outline font-bold uppercase tracking-wider">Tốc độ phản hồi TB</p>
            <h3 className="text-xl font-black text-slate-800 mt-0.5">142 ms</h3>
            <span className="text-[10px] text-emerald-600 font-bold">Tối ưu hơn 15% so với Q1</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-xl border border-outline-variant flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-outline font-bold uppercase tracking-wider">Tải lượng truy vấn</p>
            <h3 className="text-xl font-black text-slate-800 mt-0.5">4,812 lượt / ngày</h3>
            <span className="text-[10px] text-emerald-600 font-bold">Khả năng chịu tải cực cao</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-xl border border-outline-variant flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-outline font-bold uppercase tracking-wider">Số lượng Index (Chỉ mục)</p>
            <h3 className="text-xl font-black text-slate-800 mt-0.5">24,512 tokens</h3>
            <span className="text-[10px] text-indigo-600 font-bold">Tìm kiếm tương đồng mượt</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-xl border border-outline-variant flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-outline font-bold uppercase tracking-wider">Dung lượng Cache sử dụng</p>
            <h3 className="text-xl font-black text-slate-800 mt-0.5">85% hoạt động</h3>
            <span className="text-[10px] text-slate-400 font-medium">Lưu trữ truy vấn lặp lại</span>
          </div>
        </div>
      </div>

      {/* Recharts graph grids */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart 1: LineChart - Response Times (8 cols) */}
        <div className="bg-white p-6 rounded-xl border border-outline-variant lg:col-span-8">
          <div>
            <h3 className="text-base font-bold text-slate-800">Biểu đồ thời gian phản hồi hệ thống (ms)</h3>
            <p className="text-xs text-outline mt-0.5">Thống kê tốc độ tìm kiếm phân tách theo múi giờ làm việc trong ngày.</p>
          </div>

          <div className="h-64 w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={RESPONSE_TIME_DATA} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Thời gian phản hồi" 
                  stroke="#2563eb" 
                  strokeWidth={2.5} 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: PieChart - Status Rate (4 cols) */}
        <div className="bg-white p-6 rounded-xl border border-outline-variant lg:col-span-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800">Tỷ lệ truy cập thành công</h3>
            <p className="text-xs text-outline mt-0.5">Thống kê truy vấn lỗi hệ thống.</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={STATUS_PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {STATUS_PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Text label */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-lg font-black text-slate-900">94.8%</span>
              <span className="text-[9px] text-outline font-bold uppercase">Success rate</span>
            </div>
          </div>

          <div className="flex gap-4 justify-center text-xs font-bold pt-4 border-t border-slate-50">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>Thành công</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>Truy vấn thất bại</span>
          </div>
        </div>
      </div>

      {/* Query Logs Table */}
      <div className="bg-white p-6 rounded-xl border border-outline-variant">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-800">Lịch sử truy vấn thời gian thực (Live Logs)</h3>
            <p className="text-xs text-outline mt-0.5">Chi tiết các lượt tìm kiếm của Giáo viên và Sinh viên trên nền tảng.</p>
          </div>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded font-mono font-bold uppercase flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
            Kết nối máy chủ: Hoạt động
          </span>
        </div>

        <div className="overflow-x-auto custom-scrollbar -mx-6">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-surface border-b border-outline-variant text-[11px] font-bold text-outline uppercase tracking-wider">
                <th className="py-3.5 px-6">Từ khóa tìm kiếm (Query)</th>
                <th className="py-3.5 px-6">Thành viên thực hiện</th>
                <th className="py-3.5 px-6">Thời gian truy xuất</th>
                <th className="py-3.5 px-6 font-mono text-center">Thời gian xử lý</th>
                <th className="py-3.5 px-6 font-mono text-center">Kết quả</th>
                <th className="py-3.5 px-6 text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {queryLogs.map((log) => (
                <tr key={log.id} className="border-b border-slate-100 hover:bg-slate-50/60 transition-all text-xs font-semibold text-slate-800">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Search className="w-3.5 h-3.5 text-outline" />
                      <span className="font-extrabold text-slate-900">{log.queryText}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-mono">{log.user}</td>
                  <td className="py-4 px-6 text-outline">{log.timestamp}</td>
                  <td className="py-4 px-6 text-center font-mono text-slate-700">{log.responseTimeMs} ms</td>
                  <td className="py-4 px-6 text-center text-slate-700 font-mono font-bold">{log.resultCount} tài liệu</td>
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider ${
                      log.status === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {log.status === 'success' ? 'Thành công' : 'Thất bại'}
                    </span>
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
