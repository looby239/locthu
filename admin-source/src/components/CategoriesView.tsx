import React, { useState } from 'react';
import { 
  FolderCheck, Plus, TrendingUp, Grid, HelpCircle, 
  BookHeart, Calculator, Briefcase, Pill, MoreVertical, Edit2
} from 'lucide-react';
import { Screen, DocumentItem } from '../types';

interface CategoriesViewProps {
  documents: DocumentItem[];
  onNavigate: (screen: Screen, transition?: 'slide_up' | 'push_back' | 'none') => void;
}

interface CategoryCard {
  title: string;
  desc: string;
  count: number;
  status: 'THÀNH CÔNG' | 'CHỜ XỬ LÝ';
  icon: any;
  color: string;
}

export default function CategoriesView({ documents, onNavigate }: CategoriesViewProps) {
  // Compute interactive document count fields based on actual in-memory document state
  const selectCount = (domainName: string, defaultVal: number) => {
    const matched = documents.filter(d => d.domain === domainName).length;
    return defaultVal + (matched > 0 ? matched - 1 : 0);
  };

  const initialCategories: CategoryCard[] = [
    {
      title: 'Công nghệ thông tin',
      desc: 'Phát triển phần mềm, AI, An ninh mạng và Hệ thống nhúng đám mây.',
      count: selectCount('Công nghệ thông tin', 452),
      status: 'THÀNH CÔNG',
      icon: Grid,
      color: 'bg-blue-105 text-blue-600',
    },
    {
      title: 'Kinh tế',
      desc: 'Kinh tế vĩ mô, Tài chính doanh nghiệp và Chiến lược Marketing quốc tế.',
      count: selectCount('Kinh tế', 318),
      status: 'THÀNH CÔNG',
      icon: Briefcase,
      color: 'bg-emerald-105 text-emerald-600',
    },
    {
      title: 'Y dược',
      desc: 'Nghiên cứu lâm sàng, Dược lý học lâm nghiệp và Chăm sóc sức khỏe cộng đồng.',
      count: selectCount('Y dược', 215),
      status: 'CHỜ XỬ LÝ',
      icon: Pill,
      color: 'bg-rose-105 text-rose-600',
    },
    {
      title: 'Khoa học cơ bản',
      desc: 'Toán học giải tích, Vật lý lý thuyết và Động lực học chất rắn.',
      count: selectCount('Khoa học cơ bản', 194),
      status: 'THÀNH CÔNG',
      icon: Calculator,
      color: 'bg-indigo-105 text-indigo-600',
    }
  ];

  const handleAddNewCategory = () => {
    const title = prompt('Nhập tên Lĩnh vực danh mục mới cần cấu hình:');
    if (title) {
      alert(`Danh mục "${title}" đã được khởi tạo và gửi yêu cầu phê duyệt cấu trúc!`);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">Phân loại tài liệu</h2>
          <p className="text-sm text-on-surface-variant mt-1">
            Quản lý cấu trúc danh mục cho toàn bộ kho tài liệu khoa học, giáo trình đại học khoa trực thuộc.
          </p>
        </div>
        <div>
          <button 
            onClick={handleAddNewCategory}
            className="px-4 py-2.5 bg-primary text-white font-bold text-xs rounded-lg flex items-center gap-1.5 hover:opacity-95 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Thêm danh mục mới
          </button>
        </div>
      </div>

      {/* Overview Analytics Banner info cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Metric counters cards */}
        <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-outline-variant flex items-center justify-between">
          <div>
            <span className="text-[10px] text-outline font-bold tracking-wider uppercase block">Tổng tài liệu lưu kho</span>
            <span className="text-2xl font-black text-slate-800 block mt-1">1,284 tài liệu</span>
            <span className="text-[10px] text-slate-400 font-medium">Lưu trữ ở 24 phân vùng</span>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
            <FolderCheck className="w-6.5 h-6.5" />
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-outline-variant flex items-center justify-between">
          <div>
            <span className="text-[10px] text-outline font-bold tracking-wider uppercase block">Tổng số chuyên mục chính</span>
            <span className="text-2xl font-black text-slate-800 block mt-1">24 phân ngành</span>
            <span className="text-[10px] text-emerald-600 font-bold">4 danh mục mới tháng qua</span>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
            <Grid className="w-6.5 h-6.5" />
          </div>
        </div>

        {/* Right - Highlight trend analytic block */}
        <div className="lg:col-span-4 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100 flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Phân tích xu hướng</h4>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-semibold">
              Ngành Công nghệ thông tin có mức tăng trưởng tài liệu cao nhất <span className="text-primary font-bold">(12%)</span> trong tháng này.
            </p>
          </div>
        </div>
      </div>

      {/* Main Categories Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {initialCategories.map((cat, i) => {
          const CatIcon = cat.icon;
          return (
            <div key={i} className="bg-white p-5 rounded-xl border border-outline-variant hover:shadow-lg transition-all flex flex-col justify-between min-h-[190px] relative group">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 bg-slate-50 text-primary rounded-lg flex items-center justify-center">
                  <CatIcon className="w-5 h-5 text-primary" />
                </div>
                <button className="text-outline hover:text-slate-700 cursor-pointer p-1">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4">
                <h3 className="text-base font-extrabold text-slate-900 leading-tight group-hover:text-primary transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-outline mt-1.5 line-clamp-2" title={cat.desc}>
                  {cat.desc}
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-50 mt-4 text-xs font-bold">
                <span className="text-slate-800">
                  {cat.count} <span className="text-slate-400 font-medium">tài liệu</span>
                </span>
                
                <span className={`px-2 py-0.5 rounded-sm text-[9px] font-black tracking-wider ${
                  cat.status === 'THÀNH CÔNG' 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {cat.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Categories secondary dynamic table logs */}
      <div className="bg-white rounded-xl border border-outline-variant p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-800">Danh mục vừa mới cập nhật</h3>
            <p className="text-xs text-outline mt-0.5">Tiểu chuyên đề chuyên sâu mới khởi tạo được cấp phép.</p>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar -mx-6">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-surface border-b border-outline-variant text-[11px] font-bold text-outline uppercase tracking-wider">
                <th className="py-3 px-6">Tên danh mục</th>
                <th className="py-3 px-6">Thuộc lĩnh vực gốc</th>
                <th className="py-3 px-6">Người kiến tạo</th>
                <th className="py-3 px-6">Ngày khởi tạo</th>
                <th className="py-3 px-6 text-center">Trạng thái</th>
                <th className="py-3 px-6 text-right">Lựa chọn</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 hover:bg-slate-50/60 transition-all text-xs font-semibold text-slate-800">
                <td className="py-3.5 px-6 font-extrabold text-slate-900">Lập trình Python nâng cao</td>
                <td className="py-3.5 px-6">Công nghệ thông tin</td>
                <td className="py-3.5 px-6">Lê Văn A</td>
                <td className="py-3.5 px-6 text-outline">12/10/2023</td>
                <td className="py-3.5 px-6 text-center">
                  <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider">Thành công</span>
                </td>
                <td className="py-3.5 px-6 text-right">
                  <button 
                    onClick={() => {
                      alert('Thao tác sửa phân loại danh mục này được gửi lên Hội đồng Khoa học xem xét.');
                    }}
                    className="text-primary hover:bg-blue-50 px-2 py-1 rounded font-bold text-[11px] cursor-pointer"
                  >
                    Sửa
                  </button>
                </td>
              </tr>
              
              <tr className="border-b border-slate-100 hover:bg-slate-50/60 transition-all text-xs font-semibold text-slate-800">
                <td className="py-3.5 px-6 font-extrabold text-slate-900">Tài chính phi tập trung (DeFi)</td>
                <td className="py-3.5 px-6">Kinh tế</td>
                <td className="py-3.5 px-6">Nguyễn Thị B</td>
                <td className="py-3.5 px-6 text-outline">11/10/2023</td>
                <td className="py-3.5 px-6 text-center">
                  <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider">Chờ xử lý</span>
                </td>
                <td className="py-3.5 px-6 text-right">
                  <button 
                    onClick={() => {
                      alert('Thông tin danh mục đang trong trạng thái chờ xử lý phê duyệt.');
                    }}
                    className="text-primary hover:bg-blue-50 px-2 py-1 rounded font-bold text-[11px] cursor-pointer"
                  >
                    Sửa
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
