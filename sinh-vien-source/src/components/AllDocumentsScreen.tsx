/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, Search, RefreshCw, Filter, Eye, Download, 
  ChevronLeft, ChevronRight, FileCode, FileText, Star, GraduationCap 
} from 'lucide-react';
import { ScreenId, AcademicDoc, UserProfile } from '../types';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { INITIAL_DOCUMENTS } from '../data';

interface AllDocumentsScreenProps {
  profile: UserProfile;
  onNavigate: (screen: ScreenId, transition?: 'none' | 'push' | 'push_back') => void;
}

export default function AllDocumentsScreen({ profile, onNavigate }: AllDocumentsScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [docFilter, setDocFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('latest');

  // Filter local document listings for CNTT
  const cnttDocs = INITIAL_DOCUMENTS.filter(doc => doc.category === 'cntt');

  const filteredDocs = cnttDocs.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = docFilter === 'All' || doc.type === docFilter;
    return matchesSearch && matchesType;
  });

  const handleResetFilters = () => {
    setSearchTerm('');
    setDocFilter('All');
    setYearFilter('All');
    setSortOrder('latest');
  };

  return (
    <div className="flex bg-[#f8f9fd] min-h-screen">
      {/* Sidebar navigation */}
      <Sidebar currentScreen="classify" onNavigate={onNavigate} />

      {/* Main Content Area */}
      <div className="flex-1 ml-[280px] pt-[70px] flex flex-col p-8 space-y-6">
        <Topbar title="Kho khoa học máy tính" subtitle="Học liệu học tập CNTT" profile={profile} onNavigate={onNavigate} />

        {/* Clickable Breadcrumbs back navigation: //span[contains(text(), 'Kho tài liệu')] */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white px-4 py-2 border border-slate-200/60 rounded-xl w-max shadow-sm animate-fade-in">
          <button 
            onClick={() => onNavigate('classify', 'push_back')}
            className="hover:text-[#003fb1] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <ArrowLeft size={14} />
            {/* The precise target */}
            <span className="font-bold">Kho tài liệu</span>
          </button>
          <ChevronRight size={12} className="text-slate-300" />
          <span className="text-[#003fb1]">Công nghệ Thông tin</span>
        </div>

        {/* Category Header Title */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2 animate-fade-in">
          <h3 className="text-xl font-bold text-slate-800">Công nghệ Thông tin</h3>
          <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-4xl">
            Khám phá và truy cập các tài liệu học tập, giáo trình chuyên ngành và nghiên cứu khoa học thuộc lĩnh vực Công nghệ Thông tin. Tài liệu được cập nhật tự động từ ban quản trị Hệ thống dữ liệu trường học.
          </p>
        </div>

        {/* Filter controls panel */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 animate-fade-in">
          <div className="flex gap-4 items-center flex-wrap">
            
            {/* Search inputs */}
            <div className="flex-1 min-w-[240px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm tài liệu học tập..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#003fb1]/20 focus:border-[#003fb1] focus:bg-white transition-all font-medium"
              />
            </div>

            {/* Filter 1 */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 font-bold">Loại tài liệu:</span>
              <select
                value={docFilter}
                onChange={(e) => setDocFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg text-xs py-1.5 px-3 font-semibold text-slate-600 outline-none cursor-pointer"
              >
                <option value="All">Tất cả</option>
                <option value="PDF">PDF</option>
                <option value="DOCX">DOCX</option>
                <option value="SLIDE">SLIDE</option>
              </select>
            </div>

            {/* Filter 2 */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 font-bold">Năm xuất bản:</span>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg text-xs py-1.5 px-2.5 font-semibold text-slate-600 outline-none cursor-pointer"
              >
                <option value="All">Tất cả năm</option>
                <option value="2024">Năm 2024</option>
                <option value="2023">Năm 2023</option>
              </select>
            </div>

            {/* Sorter */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 font-bold">Sắp xếp theo:</span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg text-xs py-1.5 px-2.5 font-semibold text-slate-600 outline-none cursor-pointer"
              >
                <option value="latest">Mới nhất</option>
                <option value="views">Lượt xem nhiều</option>
              </select>
            </div>

            {/* Reset helper button */}
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 hover:bg-blue-50 text-[#003fb1] border border-blue-200 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ml-auto cursor-pointer"
            >
              <RefreshCw size={13} />
              Làm mới bộ lọc
            </button>

          </div>
        </div>

        {/* Document tabular layout matching Image 5 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 font-black uppercase tracking-wider border-b border-slate-150">
                <tr>
                  <th className="px-6 py-4 font-black">Tên tài liệu</th>
                  <th className="px-6 py-4 font-black">Tác giả / Nguồn</th>
                  <th className="px-6 py-4 font-black">Ngày tải lên</th>
                  <th className="px-6 py-4 font-black text-center">Loại</th>
                  <th className="px-6 py-4 font-black text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-bold text-[#191c2f]">
                {filteredDocs.length > 0 ? (
                  filteredDocs.slice(0, 4).map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold flex items-center gap-3">
                        <div className={`p-2 rounded-lg shrink-0 ${
                          doc.type === 'PDF' ? 'bg-red-50 text-red-500' :
                          doc.type === 'DOCX' ? 'bg-blue-50 text-blue-500' :
                          'bg-amber-50 text-amber-500'
                        }`}>
                          <FileCode size={16} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 hover:text-[#003fb1] transition-colors cursor-pointer leading-tight">
                            {doc.title}
                          </p>
                          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{doc.size}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-semibold">{doc.author}</td>
                      <td className="px-6 py-4 text-slate-400 font-semibold">{doc.date}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-0.5 text-[10px] font-black rounded ${
                          doc.type === 'PDF' ? 'bg-red-50 text-red-600' :
                          doc.type === 'DOCX' ? 'bg-blue-50 text-blue-600' :
                          'bg-amber-50 text-amber-600'
                        }`}>
                          {doc.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center space-x-1.5">
                        <button className="p-1.5 text-slate-400 hover:text-[#003fb1] rounded hover:bg-slate-50 transition-colors" title="Xem trước">
                          <Eye size={15} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-[#003fb1] rounded hover:bg-slate-50 transition-colors" title="Tải về file">
                          <Download size={15} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400 font-semibold">
                      Không tìm thấy tài liệu phù hợp trong DMRS CNTT.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Simple Static Pagination footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
            <div>
              Hiển thị <span className="text-slate-800 font-bold">{Math.min(filteredDocs.length, 4)}</span> trên{' '}
              <span className="text-slate-800 font-bold">120</span> tài liệu
            </div>
            <div className="flex items-center gap-3">
              <span>Trang 1/10</span>
              <div className="flex gap-1">
                <button className="p-1 rounded bg-white border border-slate-200 text-slate-400 hover:bg-slate-50 cursor-pointer">
                  <ChevronLeft size={16} />
                </button>
                <button className="p-1 rounded bg-white border border-slate-200 text-slate-400 hover:bg-slate-50 cursor-pointer">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Được xem nhiều gần đây */}
        <div className="space-y-4 animate-fade-in pt-2">
          <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Được xem nhiều gần đây
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-5 rounded-xl border border-slate-200/70 hover:shadow-sm transition-all space-y-3">
              <span className="text-[9px] font-black tracking-widest text-[#003fb1] bg-blue-50 px-2 py-0.5 rounded uppercase">
                nghiên cứu khoa học
              </span>
              <h5 className="font-bold text-xs text-slate-800 line-clamp-2 leading-relaxed">
                Ứng dụng AI trong chẩn đoán y tế
              </h5>
              <p className="text-[11px] text-slate-500 leading-normal line-clamp-2 font-medium">
                Phân tích thực trạng và tiềm năng phát triển tại Việt Nam liên kết xử lý dữ liệu...
              </p>
              <div className="pt-2 text-slate-400 text-[10px] font-bold flex justify-between items-center">
                <span>1,2k lượt xem</span>
                <Eye size={12} />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200/70 hover:shadow-sm transition-all space-y-3">
              <span className="text-[9px] font-black tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                giáo trình
              </span>
              <h5 className="font-bold text-xs text-slate-800 line-clamp-2 leading-relaxed">
                Toán rời rạc và ứng dụng CNTT
              </h5>
              <p className="text-[11px] text-slate-500 leading-normal line-clamp-2 font-medium">
                Kiến thức nền tảng bắt buộc cho sinh viên công nghệ thông tin năm thứ 2...
              </p>
              <div className="pt-2 text-slate-400 text-[10px] font-bold flex justify-between items-center">
                <span>850 lượt xem</span>
                <Eye size={12} />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200/70 hover:shadow-sm transition-all space-y-3">
              <span className="text-[9px] font-black tracking-widest text-orange-600 bg-orange-50 px-2 py-0.5 rounded uppercase">
                slide bài giảng
              </span>
              <h5 className="font-bold text-xs text-slate-800 line-clamp-2 leading-relaxed">
                Phát triển phần mềm hướng đối tượng
              </h5>
              <p className="text-[11px] text-slate-500 leading-normal line-clamp-2 font-medium">
                Tổng hợp các mẫu Design Pattern thông dụng nhất trong phát triển...
              </p>
              <div className="pt-2 text-slate-400 text-[10px] font-bold flex justify-between items-center">
                <span>640 lượt xem</span>
                <Eye size={12} />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
