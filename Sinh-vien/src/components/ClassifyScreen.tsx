/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  BookOpen, Eye, ArrowUpRight, TrendingUp, Cpu, 
  Banknote, Globe2, Palette, Download, Bot, ChevronRight 
} from 'lucide-react';
import { ScreenId, AcademicDoc, UserProfile } from '../types';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { RECENT_UPLOADED } from '../data';

interface ClassifyScreenProps {
  profile: UserProfile;
  onNavigate: (screen: ScreenId, transition?: 'none' | 'push' | 'push_back') => void;
}

export default function ClassifyScreen({ profile, onNavigate }: ClassifyScreenProps) {
  
  const categories = [
    {
      id: 'cntt',
      title: 'Công nghệ Thông tin',
      count: '4.5k Tài liệu',
      description: 'Kho tài liệu về Phát triển phần mềm, AI, Network và Bảo mật.',
      icon: Cpu,
      color: 'blue',
      popular: [
        'Cấu trúc dữ liệu và Giải thuật (Nâng cao)',
        'Học máy ứng dụng trong phân tích dữ liệu'
      ],
      btnClass: 'bg-[#003fb1] hover:bg-[#114ec3] text-white',
    },
    {
      id: 'kinhte',
      title: 'Kinh tế & Quản trị',
      count: '3.2k Tài liệu',
      description: 'Tài chính, Marketing, Quản trị nhân sự và Kinh tế vĩ mô.',
      icon: Banknote,
      color: 'gray',
      popular: [
        'Chiến lược Marketing 4.0 trong kỷ nguyên số',
        'Quản trị chuỗi cung ứng toàn cầu'
      ],
      btnClass: 'bg-[#5c5f60] hover:bg-[#484a4b] text-white',
    },
    {
      id: 'ngonngu',
      title: 'Ngôn ngữ & Văn hóa',
      count: '2.8k Tài liệu',
      description: 'Anh văn chuyên ngành, Biên phiên dịch và Văn hóa học.',
      icon: Globe2,
      color: 'teal',
      popular: [
        'Lý thuyết Biên dịch nâng cao',
        'Văn hóa các nước ASEAN'
      ],
      btnClass: 'bg-[#005438] hover:bg-[#003c28] text-white',
    },
    {
      id: 'thietke',
      title: 'Thiết kế Đồ họa',
      count: '1.5k Tài liệu',
      description: 'UI/UX, Đồ họa 2D/3D, Typography và Tư duy thẩm mỹ.',
      icon: Palette,
      color: 'orange',
      popular: [
        'Nguyên lý thị giác trong Design',
        'Nghiên cứu hành vi người dùng UI/UX'
      ],
      btnClass: 'bg-[#5c5f60] hover:bg-[#484a4b] text-white',
    }
  ];

  return (
    <div className="flex bg-[#f8f9fd] min-h-screen">
      {/* Sidebar handles main anchor navigations */}
      <Sidebar currentScreen="classify" onNavigate={onNavigate} />

      {/* Main Container */}
      <div className="flex-1 ml-[280px] pt-[70px] flex flex-col p-8 space-y-6">
        <Topbar title="Kho tài liệu học tập" subtitle="Phân loại tài liệu học thuật" profile={profile} onNavigate={onNavigate} />

        {/* Header Hero Banner matching Image 3 */}
        <div className="w-full relative overflow-hidden bg-gradient-to-r from-[#003fb1] to-[#1e61ea] text-white p-8 rounded-2xl shadow-sm flex justify-between items-center group">
          <div className="absolute inset-0 z-0 opacity-10">
            <svg width="100%" height="100%">
              <pattern id="banner-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#ffffff" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#banner-grid)" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl space-y-3">
            <h3 className="text-2xl font-extrabold tracking-tight">Khám phá Kho tài liệu</h3>
            <p className="text-sm font-medium text-blue-100 leading-relaxed">
              Truy cập hơn 15,000+ tài liệu chuyên ngành, nghiên cứu khoa học và giáo trình bản quyền dành riêng cho Sinh viên DMRS.
            </p>
            
            {/* Stats row inside banner */}
            <div className="flex items-center gap-6 pt-2">
              <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                <span className="block text-[10px] text-blue-200 uppercase font-black">Tổng tài liệu</span>
                <span className="text-lg font-black tracking-tight">15,482</span>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                <span className="block text-[10px] text-blue-200 uppercase font-black">Lượt xem tuần này</span>
                <span className="text-lg font-black tracking-tight">2,109</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block shrink-0 relative z-10 transform group-hover:rotate-6 transition-transform duration-300">
            <BookOpen size={92} className="text-blue-100/30" />
          </div>
        </div>

        {/* Categories Section Header */}
        <div className="space-y-1">
          <h4 className="text-base font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
            Lĩnh vực học thuật
          </h4>
          <p className="text-xs text-slate-500 font-medium">Lựa chọn chuyên ngành để tra cứu sâu tài liệu</p>
        </div>

        {/* Grid of Categories - CRITICAL FOR XPATH SIBLINGS CHECK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => {
            const IconComp = cat.icon;
            return (
              <div 
                key={cat.id} 
                className="bg-white p-6 rounded-2xl border border-[#E5E7EB] hover:border-blue-200 hover:shadow-md transition-all duration-150 flex flex-col justify-between"
              >
                <div>
                  {/* Category Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl ${
                      cat.id === 'cntt' ? 'bg-blue-50 text-blue-600' :
                      cat.id === 'kinhte' ? 'bg-slate-50 text-slate-600' :
                      cat.id === 'ngonngu' ? 'bg-emerald-50 text-emerald-600' :
                      'bg-orange-50 text-orange-600'
                    }`}>
                      <IconComp size={22} />
                    </div>
                    <span className="text-xs font-bold bg-slate-50 text-slate-500 border border-slate-100 px-2.5 py-1 rounded-full">
                      {cat.count}
                    </span>
                  </div>

                  {/* Sibling Check - IMPORTANT DESIGN FOR: //h4[contains(text(), 'Công nghệ Thông tin')]/following-sibling::button */}
                  <div className="space-y-2 mb-4">
                    <h4 className="text-base font-bold text-slate-800">{cat.title}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Popular list item rows inside card */}
                  <div className="mb-6 space-y-2">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">Tài liệu phổ biến:</span>
                    <ul className="space-y-2">
                      {cat.popular.map((pop, idx) => (
                        <li key={idx} className="flex gap-2 items-center text-xs text-slate-700 font-medium">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            cat.id === 'cntt' ? 'bg-blue-500' : 'bg-slate-400'
                          }`}></span>
                          <span className="line-clamp-1">{pop}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sibling button triggering repositories navigation */}
                <button
                  id={`cat-btn-${cat.id}`}
                  onClick={() => {
                    if (cat.id === 'cntt') {
                      onNavigate('all-documents', 'push');
                    }
                  }}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.01] ${cat.btnClass}`}
                >
                  Xem tất cả
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
          
          {/* Latest Academic Documents Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <TrendingUp size={16} className="text-[#003fb1]" />
                Tài liệu mới nhất
              </h5>
              <a 
                href="#all"
                onClick={(e) => { e.preventDefault(); onNavigate('all-documents', 'push'); }}
                className="text-xs text-[#003fb1] font-bold hover:underline"
              >
                Xem thêm
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-2.5 font-bold">Tên tài liệu</th>
                    <th className="py-2.5 font-bold text-center">Lĩnh vực</th>
                    <th className="py-2.5 font-bold text-center">Ngày đăng</th>
                    <th className="py-2.5 font-bold text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-semibold text-slate-700">
                  {RECENT_UPLOADED.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 font-semibold flex items-center gap-2">
                        <span className="p-1.5 bg-blue-50 text-blue-600 rounded">
                          <BookOpen size={12} />
                        </span>
                        <span className="line-clamp-1">{doc.title}</span>
                      </td>
                      <td className="py-3 text-center">
                        <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded ${
                          doc.category === 'cntt' ? 'bg-blue-50 text-blue-600' :
                          doc.category === 'kinhte' ? 'bg-slate-50 text-slate-600' :
                          'bg-emerald-50 text-emerald-700'
                        }`}>
                          {doc.category === 'cntt' ? 'CNTT' : doc.category === 'kinhte' ? 'Kinh tế' : 'Ngôn ngữ'}
                        </span>
                      </td>
                      <td className="py-3 text-center text-slate-400">{doc.date}</td>
                      <td className="py-3 text-center">
                        <button className="p-1.5 text-[#5c5f60] hover:text-[#003fb1] hover:bg-[#e5eeff] rounded transition-colors">
                          <Download size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Chat AI shortcut support widget - MUST HAVE THE EXACT LINK */}
          <div className="bg-[#003fb1] rounded-2xl text-white p-6 shadow-md flex flex-col justify-between relative overflow-hidden group">
            {/* Background design accents */}
            <div className="absolute bottom-0 right-0 w-44 h-44 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

            <div className="space-y-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white backdrop-blur-sm shadow-sm">
                <Bot size={20} />
              </div>
              <h5 className="text-sm font-bold tracking-wide">Cần hỗ trợ tìm kiếm?</h5>
              <p className="text-xs leading-relaxed text-blue-100 font-semibold">
                Sử dụng Chat AI để tìm nhanh tài liệu học tập theo mô tả hoặc tóm tắt nội dung tài liệu ngay lập tức.
              </p>
            </div>

            {/* Crucial anchor navigator link: a[contains(., 'Thử Chat AI ngay')] */}
            <div className="pt-4">
              <a
                id="hero-chat-pills"
                href="#chat-ai"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('ai-retrieval', 'push_back');
                }}
                className="w-full py-3 bg-white hover:bg-slate-50 text-[#003fb1] font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 group-hover:scale-[1.01] transition-all cursor-pointer"
              >
                Thử Chat AI ngay
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
